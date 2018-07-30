import express from 'express';
import {artiRoutes} from './articles';

export function indexRoutes(db){
	var router = express.Router();

	router.get('/',(req,res)=>{
		res.render('index.html',{});
	});

	router.use('/api/v1/articles', artiRoutes(db));
	return router;
};
