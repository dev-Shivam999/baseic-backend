import express from 'express';

import { delData, getData, makeData, upData } from '../controller/controller.js';


export const router=express.Router();

router.get('/get',getData)
router.post('/makeData',makeData)
router.put('/update/:id',upData)
router.delete('/delete/:id',delData)