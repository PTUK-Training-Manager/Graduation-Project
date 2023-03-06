"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_1 = require("../model/student");
class studentController {
    addStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield student_1.Student.create(Object.assign({}, req.body));
                return res.json({ record, msg: "Successfully create student" });
            }
            catch (e) {
                return res.json({ msg: "fail to create", status: 500, route: "/create" });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield student_1.Student.findAll({});
                return res.json(records);
            }
            catch (e) {
                return res.json({ msg: "fail to read", status: 500, route: "/read" });
            }
        });
    }
}
exports.default = new studentController();
