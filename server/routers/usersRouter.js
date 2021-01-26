const express = require('express');
const router = express.Router();
const Users = require('../models/IUser');
const authenticate = require('../midleware/authenticate');

/*
    INFO : GET all the Users
    URL : http://127.0.0.1:5000/api/users/
	METHOD : GET
	Fields : no-fields
	express function : router.get();
 */
router.get('/users', async (request , response) => {
  try {
    let users = await Users.find();
    response.status(200).json(users);
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : GET a single Users
    URL : http://127.0.0.1:5000/api/users/:id
	METHOD : GET
	Fields : no-fields
	express function : router.get();
 */
router.get('/users/:id',async (request , response) => {
  let userId = request.params.id;
  try {
    let users = await Users.findById(userId); // select * from Users where id=''
    response.status(200).json(users);
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : Create a Users
    URL : http://127.0.0.1:5000/api/users/
	METHOD : POST
	Fields : Name , Gender , Email , Phone
	express function : router.post();
 */
router.post('/users', async (request , response) => {
  try {
    let newUser = {
        name : request.body.name,
        gender : request.body.gender,
        email : request.body.email,
        phone : request.body.phone
    };

    //check the Users is exists or not
    let user = await Users.findOne({name : newUser.email});
    if(user){
      return response.status(400).json({
        result : 'Failed',
        message : 'Users is already exists'

      });
    }
    user = new Users(newUser);
    user = await user.save(); // INSERT data to database

    response.status(200).json(user);
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : Update a Users
    URL : http://127.0.0.1:5000/api/users/:id
	METHOD : PUT
	Fields : Name , Gender , Email , Phone
	express function : router.put();
 */
router.put('/users/:id', async (request , response) => {
  let userId = request.params.id;
  try {
    let updatedUsers = {
      name : request.body.name,
      gender : request.body.gender,
      email : request.body.email,
      phone : request.body.phone
    };
    let user = await Users.findById(userId);
    if(user){
      user = await Users.findByIdAndUpdate(userId , {
        $set : updatedUsers
      }, {new : true});
      response.status(200).json(user);
    }
    else{
      return response.status(400).json({
        result : 'failed',
        message : 'No Users is found to update'
      });
    }
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

/*
    INFO : Delete a Users
    URL : http://127.0.0.1:5000/api/users/:id
	METHOD : DELETE
	Fields : no-fields
	express function : router.delete();
 */
router.delete('/users/:id', async (request , response) => {
  let userId = request.params.id;
  try {
    let user = await Users.findByIdAndDelete(userId);
    response.status(200).json(user)
  }
  catch (error) {
    response.status(500).json({
      error : error
    });
  }
});

module.exports = router;
