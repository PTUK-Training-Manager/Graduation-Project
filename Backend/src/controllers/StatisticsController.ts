import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../types";
import { Company, CompanyBranch, Training } from "../models";
import { Sequelize } from "sequelize";

class statisticsController {
  countStatus = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
    try {
      const records = await Training.findAll({
        attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('studentId')), 'count']],
        group: ['status']
      })

      const array = [];

      for (let i = 0; i < records.length; i++) {
        console.log("Item:", records[i].status, records[i].get("count"));
        array.push({ status: records[i].status, count: records[i].get("count") });
      }


      return res.json({
        success: true,
        status: res.statusCode,
        message: "success",
        data: array
      });
    } catch (err) {
      next(err)
    }
  }


  countTrainingsCompany = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
    try {
      const records = await Training.findAll({
        attributes: [
          [Sequelize.col('CompanyBranch.Company.id'), 'companyId'],
          [Sequelize.col('CompanyBranch.Company.name'), 'companyName'],
          [Sequelize.fn('COUNT', Sequelize.col('Training.studentId')), 'studentCount']
        ],
        include: [
          {
            model: CompanyBranch,
            as: 'CompanyBranch',
            include: [
              {
                model: Company,
                as: 'Company'
              }
            ]
          }
        ],
        group: ['CompanyBranch.CompanyId']
      })
      const array = [];

      for (let i = 0; i < records.length; i++) {
        console.log("Item:", records[i].get("companyId"), records[i].get("companyName"), records[i].get("studentCount"));
        array.push({ companyId: records[i].get("companyId"), companyName: records[i].get("companyName"), studentCount: records[i].get("studentCount") });
      }


      return res.json({
        success: true,
        status: res.statusCode,
        message: "success",
        data: array
      });
    } catch (err) {
      next(err)
    }
  }

  countTrainingsType = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
    try {
      const records = await Training.findAll({
        attributes: ['type', [Sequelize.fn('COUNT', Sequelize.col('studentId')), 'count']],
        group: ['type']
      })
      const array = [];

      for (let i = 0; i < records.length; i++) {
        console.log("Item:", records[i].type, records[i].get("count"));
        array.push({ type: records[i].type, count: records[i].get("count") });
      }


      return res.json({
        success: true,
        status: res.statusCode,
        message: "success",
        data: array
      });
    } catch (err) {
      next(err)
    }
  }
}

export default new statisticsController();