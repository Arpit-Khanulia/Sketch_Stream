import express from 'express'
import { func } from '../Controllers/func';

const router = express.Router();


router.get('/',func)


export default router;