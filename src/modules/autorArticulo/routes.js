const express = require('express');

const answer = require('../../network/answers');
const controller = require('./index');

const router = express.Router();
//rutas 
router.get('/',findAll);
router.get('/:idAutor/:idArticulo',find);
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
    const items = await controller.find(req.params.idAutor,req.params.idArticulo);
    answer.success(req,res,items,200);
    }catch(error){
        next(error);
    }
};

async function  add (req, res, next){
    try{
    const items = await controller.add(req.body);
    if(req.body.id == 0){
        message = 'Autor Articulo Articulo agregado con exito';
    }
    answer.success(req,res,message,201);
    }catch(error){
        next(error);
    }
};


module.exports = router;