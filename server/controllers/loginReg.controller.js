const {User} = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (request,response) => {
        User.create(request.body)
            .then(user => {
                response
                    .cookie(
                            "usertoken",
                            jwt.sign({ _id: user._id}, process.env.SECRET_KEY),
                            {
                            httpOnly: true,
                            }
                    )
                    .json({msg: "Register Success!", user: {
                    firstName: user.firstName,
                    lastName: user.lastName
                    }});
            })
            .catch(error => console.log("***********",response.json(error.errors)));
    },
    login: (request,response) =>{
        User.findOne({email:request.body.email})
            .then(user => {
                if(user == null){
                response.status(400).json({msg: 'Invalid login attempt!'})
                response.cookie()
                }
                else{
                    bcrypt.compare(request.body.password, user.password)
                    .then(isValid => {
                        if(isValid === true){
                            response
                                .cookie(
                                    "usertoken",
                                    jwt.sign({ _id: user._id}, process.env.SECRET_KEY),
                                    {
                                        httpOnly: true,
                                    }
                                )
                                .json({msg: "Login Success!", user: {
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                    }});
                        }       
                        else{
                            console.log("Somethan ain't right")
                            response.status(400).json({msg:"Invalid login attempt!"})
                        }
                    })
                    .catch(error =>{
                        console.log(error)
                        response.status(400),json({msg:"Invalid login attempt!"})})
                }
            })
            .catch(error => response.status(400).json(error.errors));
    },
    logout: (request,response) =>{
        response.clearCookie('usertoken'),
        response.sendStatus(200)
    }
};