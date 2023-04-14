import {Request, Response, NextFunction} from 'express';
import {ErrorResponse} from '../types';
import chalk from 'chalk';

interface Options {
    message?: string;
}
const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction, options?: Options) => {
    const errStatus: number = err.code || 500;
    const errMsg: string = err.message || 'Something went wrong';

    console.log(chalk.bgRedBright(err.stack));

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        data: err.stack
    });
};

export default errorHandler;