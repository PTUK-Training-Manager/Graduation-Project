import { Request, Response,NextFunction } from 'express';

const verifyRoles = (...allowedRoles:any) => {
    return (req:any, res:Response, next:NextFunction) => {
        if (!req?.role)
        return res.sendStatus(401);
        // return res.json("shahd");
        const rolesArray = [...allowedRoles];
        const result = (rolesArray.includes(req.role));
        
        // res.json(allowedRoles) console.log(result) console.log(req.role) console.log(rolesArray)
        if (!result) 
        return res.sendStatus(401);
        // return res.json("haneen");
        next();
    }
}

export default verifyRoles
