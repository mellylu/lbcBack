const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

const JWT_SECRET = process.env.JWT_SECRET;
const Token = require("../models/token.model");
const User = require("../models/user.model");

const sendEmail = require("../utils/sendEmailForgotPassword.js")


exports.sendEmailToResetPassword = (req, res) => {
    if (req.body.email) {
        // User.findOne({
        //     user: [{ email: req.body.email }],
        // })
        User.findOne({ "email": req.body.email })
        .then((user) => {
            if (user) {
                console.log("UUUUUUSSSSSSSSEEEEEEEEERRRRRRRRR")
                console.log(user)
                Token.findOne({
                    userId: user._id,
                })
                    .then(token => {
                        if (token) {

                            sendEmail.sendEmail(req, res, token, req.body.email)
                           
                            res.status(200).send({
                                success: true,
                                message: "Email sended",
                                email: user?.email,
                            });
                        } else {
                            const userToken = jwt.sign(
                                {
                                    hash: randomString.generate(100),
                                },
                                JWT_SECRET,
                                {
                                    expiresIn: 86400,
                                },
                            );

                            const token = new Token({
                                userId: user?._id,
                                token: userToken,
                            });
                            token.save();

                            sendEmail.sendEmail(req, res, token, req.body.email)
                            

                            
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(401).send({
                            success: false,
                            message: "Eepp",
                        });
                    });
            } else {
                res.status(201).send({
                    success: true,
                    message: "User not found",
                });
            }
                
        })
        .catch(() => {
            res.status(401).send({
                success: false,
                message: "Error has occured",
            });
        });
} else {
    res.status(400).send({
        success: false,
        message: "Missing data",
    });
}
}

exports.formResetPassword = (req, res) => {
    Token.findOne({ "token": req.body.token })
    .then((data) => {
        res.status(200).send({
            data: data
        })

    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
            
}
