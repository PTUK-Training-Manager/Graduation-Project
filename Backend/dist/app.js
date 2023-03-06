"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const connection_1 = __importDefault(require("./config/connection"));
const student_router_1 = __importDefault(require("./routes/student.router"));
app.use(express_1.default.json());
app.use("/student", student_router_1.default);
connection_1.default.sync()
    .then(() => {
    console.log('All models were synchronized successfully.');
})
    .catch((error) => {
    console.error('An error occurred while synchronizing models:', error);
});
app.listen(port, () => console.log(`listening on ${port}`));
