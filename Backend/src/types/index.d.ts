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
export {};

export interface LoginPayload {
    username: string,
    roleId: number 
}