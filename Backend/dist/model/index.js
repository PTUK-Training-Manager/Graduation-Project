"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_1 = require("./student");
student_1.Student.sync().then(() => {
    console.log("connect to db");
});
