import { Request, Response,NextFunction } from 'express';

const verifyRoles = (...allowedRoles:any) => {
    return (req:Request, res:Response, next:NextFunction) => {
        if (!req?.role)
        return res.sendStatus(401);
        const rolesArray = [...allowedRoles];        
        const result = (rolesArray.includes(req.role));
        if (!result) 
          return res.sendStatus(401);
        next();
    }
}

export default verifyRoles
