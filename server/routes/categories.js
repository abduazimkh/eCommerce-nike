const express = require("express");
const Category = require("../models/Category");
const verify_admin = require("../middlewares/verify-admin");

const categories = express.Router();

categories.get("/", async (req, res) => {
    const categories = await Category.find();
    res.json({
        payload: categories
    })
})

categories.get("/:id", async (req, res) => {
    const id = req.params.id
    const category = await Category.find({ category_name: id });
    res.json({
        payload: category
    })
})

categories.post("/", verify_admin, async (req, res) => {
    const category = new Category(req.body)
    await category.save()
    res.json({
        payload: category
    })
})

module.exports = categories