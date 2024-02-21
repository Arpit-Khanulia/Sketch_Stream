import {Response,Request} from 'express'

export const func = (req:Request,res:Response)=>{

    res.send('hello world');

}