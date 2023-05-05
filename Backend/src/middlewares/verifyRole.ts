import { Request, Response, NextFunction } from 'express';

const verifyRoles = (allowedRoles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.user?.roleId)
            return res.sendStatus(401);
        if (!allowedRoles.includes(req.user.roleId))
            return res.sendStatus(401);
        next();
    }
}

export default verifyRoles
