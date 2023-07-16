import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import studentController from "../controllers/StudentController"
import { StudentRequestBody } from '../types';
const router = express.Router();
const upload = multer({ dest: '../uploads/' });


router.post('/upload', upload.single('file'), async (req: StudentRequestBody, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `../uploads/${file.filename}`;
    const data: any[] = [];

    if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      // Parse Excel file
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      jsonData.forEach((row: unknown[]) => {
        const parsedRow: { [key: string]: any } = {};
        row.forEach((cell, index) => {
          const headerCell = jsonData[0][index] as string;
          parsedRow[headerCell] = cell;
        });
        data.push(parsedRow);
      });
      let flag: any = true;
      let ids: string[] = [];
      for (let i = 1; i < data.length; i++) {
        if (Object.keys(data[i]).length === 0)
          continue;
        req.body.name = data[i].name as string;
        req.body.id = data[i].id as string;
        req.body.email = data[i].email as string;
        req.body.phoneNumber = data[i].phoneNumber as string;
        req.body.department = data[i].department as string;
        flag = await studentController.addStudent(req, res, next);
        console.log(flag);
        if (flag != "ok") {
          ids.push(flag);
        }
      }
      if (ids.length != 0)
        return res.json({
          success: true,
          status: res.statusCode,
          message: "error in adding students",
          data: ids
        });
      else
        return res.json({
          success: true,
          status: res.statusCode,
          message: "success adding students",
        });

    } else {
      return res.status(400).json({ message: 'Invalid file format' });
    }
  } catch (err) {
    console.log("error");
  }
});

export default router;
