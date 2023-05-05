import express from 'express';

declare global {
    namespace Express {
        interface Request {
            // role: number,
            user: {
                userId: number,
                username: string,
                roleId: number
            }
        }
    }
};
export { };