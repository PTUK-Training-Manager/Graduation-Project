import { Request, Response, NextFunction } from 'express';
import {ErrorResponse} from 'src/types';

const errorHandler = (err:ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    
    console.log("Middleware Error Handling");
    const errStatus: number = err.code || 500;
    const errMsg: string = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        // details: " ",
        data: process.env.NODE_ENV === 'development' ? err.data : {}
    });
};

export default errorHandler;