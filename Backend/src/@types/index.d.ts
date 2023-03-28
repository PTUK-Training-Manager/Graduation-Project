import express from 'express';

declare global{
    namespace Express {
        interface Request {
            role: number,
            user: {username: string,
            roleId: number}
        }
    }
};