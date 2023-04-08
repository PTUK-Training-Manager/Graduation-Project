import express from 'express';

declare global {
    namespace Express {
        interface Request {
            role: number,
            user: {username: string,
            roleId: number}
        }
    }
    namespace ExpressStudent {
        interface Request {
            body:
            {
                studentId: string,
                studentName: string,
                email: string,
                phoneNumber: string
            }
        }
    }
    namespace ExpressCompany {
        interface Request {
            body:
            {
                companyId: number;
                companyName: string;
                email: string;
                location: string;
                phoneNumber: string;
                managerName: string;
            }
        }
    }
    namespace ExpressBranch {
        interface Request {
            body:
            {
                companyId: number;
                location: string;
            }
        }
    }
};
export { };