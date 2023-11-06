const express = require('express');

const answer = require('../../network/answers');
const controller = require('./index');

const router = express.Router();
//rutas 
router.get('/',findAll);
router.get('/:id',find);
router.put('/',delated);
router.post('/',add);

//funciones 

async function findAll (req, res, next){
    try{
    const items = await controller.findAll();
    answer.success(req,res,items,200);
    }catch(error){
        next(error);
    }
};

async function  find (req, res, next){
    try{
    const items = await controller.find(req.params.id);
    answer.success(req,res,items,200);
    }catch(error){
        next(error);
    }
};

async function  delated (req, res, next){
    try{
    const items = await controller.delated(req.body);
    answer.success(req,res,'Autor eliminado',200);
    }catch(error){
        next(error);
    }
};

async function  add (req, res, next){
    try{
    const items = await controller.add(req.body);
    if(req.body.id == 0){
        message = 'Autor agregado con exito';
    }else{
        message = 'Autor actualizado con exito';
    }
    answer.success(req,res,message,201);
    }catch(error){
        next(error);
    }
};


module.exports = router;