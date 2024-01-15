const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const verify_user = require("../middlewares/verify-user");

const user = express.Router();

user.post("/register", async (req, res) => {
    const {email, photo_url, first_name} = req.body;
    let user = await User.findOne({email: email});
    const role = () => {
        if(email === process.env.PROJECT_ADMIN){
            return "admin"
        }
        else{
            return "user"
        }
    }

    if(user){
        return res.status.json({
            payload: {
                messages: {
                    message_uz: "Foydalanuvchi allaqachon mavjud",
                    message_en: "User is already exist"
                }  
            }
        })
    }

    user = await User.create({
        email: email,
        photo_url: photo_url,
        first_name: first_name,
        role: role(),
        registered_at: new Date().getTime()
    })
    
    jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90), user: {email: user.email, role: user.role, _id: user._id} }, process.env.TOKEN_SECRET_KEY, function(err, token) {
        if(err) throw err;
            res.status(200).json({
                payload: {
                    user,
                    token,
                    messages: {
                        message_en: "Successfully registered",
                        message_uz: "Muvaffaqiyatli ro'yxatdan o'tdingiz"
                    }
                }
            });
    })
})

user.post("/login", async (req, res) => {
    const {email} = req.body;
    let user = await User.findOne({email: email});

    if(!user){
        return res.status.json({
            payload: {
                messages: {
                    message_uz: "Foydalanuvchi mavjud emas",
                    message_en: "User doesn't exist"
                }
            }
           
        })
    }

    jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90), user: {email: user.email, role: user.role, _id: user._id} }, process.env.TOKEN_SECRET_KEY, function(err, token) {
        if(err) throw err;
            res.status(200).json({
                payload: {
                    user,
                    token,
                    messages: {
                        message_en: "Successfully logged in",
                        message_uz: "Muvaffaqiyatli tizimga kirdingiz"
                    }
                }
            });
    })
})

user.get("/profile", verify_user, async (req, res) => {
    const email = req.user.email;
    const user = await User.findOne({email: email});
    res.status(200).json({
        payload: user
    })
})

user.get("/profile/liked-products", verify_user, async (req, res) => {
    const email = req.user.email;
    const user = await User.findOne({email: email});
    const liked = user.liked;
    const products = await Product.find({ _id: { $in: liked } });
    res.status(200).json({
        payload: products
    })
})

module.exports = user;