import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../model/user';

interface LoginRequestBody {
    username: string;
    password: string;
  }


const handleLogin = async(req:Request <{}, {}, LoginRequestBody> ,res:Response)=>{
    const { username, password } = req.body ;
    if (!username || !password) 
    return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser= await User.findOne({ where: { username } });
    if (!foundUser) return res.sendStatus(401); 
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

}