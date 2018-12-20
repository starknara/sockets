import {Router, Request, Response} from 'express';
import Server from '../clases/server'

export const router = Router();


router.get('/mensajes',(req:Request, res:Response)=>{
    res.status(200).send(
    {
        ok:true,
        mensaje: 'Respuesta ok!'
    })
});

router.post('/mensajes',(req:Request, res:Response)=>{
    var entrada = req.body.entrada;
    const payload = {
        entrada:entrada
    }
    const server = Server.instance;
    server.io.emit('mensaje-general',payload);
    res.status(200).send(
    {
        ok:true,
        mensaje: 'post',
        entrada:entrada
    });
});

router.post('/mensajes/:id',(req:Request, res:Response)=>{

    // {const cuerpo = req.body.cuerpo;
    // const id = req.params.id;}
    var entrada = req.body.entrada;
    var de = req.body.de;
    var id = req.params.id;

    const payload = {
        de:de,
        entrada:entrada
    }

        const server = Server.instance;
        server.io.in(id).emit('mensaje-privado',payload);
    
        res.status(200).send(
        {
            ok:true,
            mensaje: 'Respuesta correcto',
            entrada:entrada,
            id
        })
});