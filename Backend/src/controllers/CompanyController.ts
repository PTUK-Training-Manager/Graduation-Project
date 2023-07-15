import { NextFunction, Request, Response } from "express";
import UserController from "./UserController";
import {
  BranchRequestBody,
  CompanyRequestBody,
  BaseResponse,
  AddFieldBody,
  GridResponse,
  PaginatedRequest,
} from "../types";
import { UserRoleEnum } from "../enums";
import { getCompanyId } from "../utils";
import {
  CompanyField,
  Company,
  CompanyBranch,
  User,
  Field,
} from "../models/index";
import { Op } from "sequelize";
import { DEFAULT_PAGE_SIZE } from "../constants";

class CompanyController {
  constructor() {
    this.addCompany = this.addCompany.bind(this);
    this.handleAddBranch = this.handleAddBranch.bind(this);
  }

  async addCompany(
    req: CompanyRequestBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) {
    const { id, name, email, location, phoneNumber, managerName } = req.body;
    try {
      const company = await Company.findByPk(id);

      if (!company) {
        const { temp, password } = await UserController.generateAccount(
          name,
          location
        );
        const userId = await UserController.addUser({
          username: temp,
          password,
          email,
          saltRounds: 10,
          roleId: UserRoleEnum.Company,
          name,
        }); // company roleID in DataBase

        const record = await Company.create({
          id,
          name,
          phoneNumber,
          managerName,
          userId,
        });

        if (!record)
          return res.json({
            success: false,
            status: res.statusCode,
            message: "error creating account Company",
          });

        await this.addBranch(res, id, location, next);
      } else
        return res.json({
          success: false,
          status: res.statusCode,
          message: "The Company already exists",
          data: company,
        });
    } catch (error) {
      next(error);
    }
  }

  async addBranch(
    res: Response<BaseResponse>,
    id: number,
    location: string,
    next: NextFunction
  ) {
    try {
      const company = await Company.findByPk(id);
      if (!company)
        return res.json({
          success: false,
          status: res.statusCode,
          message: "the company does not exist",
        });

      const branchRecord = await CompanyBranch.findOne({
        where: { location, companyId: id },
      });

      if (branchRecord)
        return res.json({
          success: false,
          status: res.statusCode,
          message: "Company and its Branch already exists",
          data: company,
        });

      const branch = await CompanyBranch.create({
        location,
        companyId: id,
      });

      if (!branch)
        return res.json({
          success: false,
          status: res.statusCode,
          message: "error adding Branch",
        });

      return res.json({
        success: true,
        status: res.statusCode,
        message: "success adding new branch/company",
        data: {
          companyID: company.id,
          companyName: company.name,
          location: branch.location,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async handleAddBranch(
    req: CompanyRequestBody,
    res: Response,
    next: NextFunction
  ) {
    const { id, location } = req.body;

    await this.addBranch(res, id, location, next);
  }

  async getCompanies(
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;
      const companies = await Company.findAll({
        include: [
          {
            model: User,
            attributes: ["email"],
          },
        ],
        limit: size,
        offset: page * size,
      });
      const totalItems = await Company.count();
      return res.json({
        items: companies,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
      });
    } catch (err) {
      next(err);
    }
  }
  async getBranches(
    req: BranchRequestBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) {
    try {
      const companyId = req.body.companyId;
      const locations = await CompanyBranch.findAll({
        where: { companyId },
        attributes: ["id", "location"],
      });
      return res.json({
        success: true,
        status: res.statusCode,
        message: "success retrieve all branches",
        data: locations,
      });
    } catch (err) {
      next(err);
    }
  }

  addFields = async (
    req: AddFieldBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { fields } = req.body;
      const userId = req.user.userId;
      const companyId = await getCompanyId(userId);
      const promises: Promise<CompanyField>[] = [];
      let fieldRecord: Field;
      for (let i = 0; i < fields.length; i++) {
        if (!fields[i].id) {
          fieldRecord = await Field.create({ field: fields[i].label });
          fields[i].id = fieldRecord.id;
        }
        const companyFieldPromise = CompanyField.create({
          fieldId: fields[i].id,
          companyId,
        });
        promises.push(companyFieldPromise);
      }
      await Promise.all(promises);
      return res.json({
        success: true,
        status: res.statusCode,
        message: "Fields Added successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  getAllFields = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    //fields that company not belongs to
    try {
      const userId = req.user.userId;
      const companyId = await getCompanyId(userId);
      const fieldsIdsRecord = await CompanyField.findAll({
        where: { companyId },
      });
      const fieldIds = fieldsIdsRecord.map((obj) => obj.fieldId);
      const fields = await Field.findAll({
        where: {
          id: {
            [Op.notIn]: fieldIds,
          },
        },
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: "Fields: ",
        data: fields,
      });
    } catch (err) {
      next(err);
    }
  };

  getCompanyFields = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    //field of company
    try {
      const userId = req.user.userId;
      const companyId = await getCompanyId(userId);
      const fields = await CompanyField.findAll({
        where: { companyId },
        include: [{ model: Field }],
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: "Fields: ",
        data: fields,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new CompanyController();