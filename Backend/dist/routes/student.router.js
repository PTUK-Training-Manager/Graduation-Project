"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const student_controller_1 = __importDefault(require("../controller/student.controller"));
router.get('/addStudent', student_controller_1.default.addStudent);
router.post('/getAll', student_controller_1.default.getAll);
exports.default = router;
