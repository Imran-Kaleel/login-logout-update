import express from 'express';

import { signin } from '../controller/signup.js';
import { createUser, getProfile, logout, updateProfile } from '../controller/createUser.js';

const routes = express.Router();


// routes.post('/signup', signup );
routes.post('/signup', signin );    
routes.post('/createUser', createUser)                            //    {domainname}/api/user/signup                                //    {domainname}/api/user/signup
routes.post('/profileUpdate', updateProfile );    
routes.get('/getProfile', getProfile );    
routes.post('/logout', logout );    

export default routes;