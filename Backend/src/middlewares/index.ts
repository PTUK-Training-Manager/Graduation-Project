import app from "../app";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import router from "../routes";
import errorHandler from "./errorHandler";
import "./cors";

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev')); // Create new morgan logger middleware function
app.use('/api/v1', router);
app.use(errorHandler);

export default app;