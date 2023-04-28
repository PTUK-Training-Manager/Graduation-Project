import { Request, Response, NextFunction } from 'express';
import { BaseErrorResponse } from '../types';
import chalk from 'chalk';

const errorHandler = (err: BaseErrorResponse, req: Request, res: Response<BaseErrorResponse>, next: NextFunction) => {
    const errStatus: number = err.status || 500;
    const errMsg: string = err.message || 'Something went wrong';

    console.log(chalk.bgRedBright(err.stack));

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: err.stack,
        origin: req.headers.origin,
    });
};

export default errorHandler;