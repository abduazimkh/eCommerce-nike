const express = require("express");
const verify_admin = require("../middlewares/verify-admin");
const Product = require("../models/Product");
const Sales = require("../models/Sales");
const sales = express.Router();
const timeformatter = require("../helpers/timeformatter");

sales.patch("/sell", verify_admin, async (req, res) => {
    const ids = req.body.ids;
    const counts = req.body.counts;

    let sales = []

    try {
        for(let i = 0; i < ids.length; i++){
            const count = counts[i];
            const product = await Product.findByIdAndUpdate({ _id: ids[i]}, {
                $inc: {
                    number_in_stock: -count
                },
                
            },  { new: true });

            let sale;

              sale = await Sales.create({
                    product: product,
                    quantity: count,
                    date: timeformatter(new Date()),
                    total: product.sale_price * count,
                    profit: product.sale_price * count - product.original_price * count
                })
            sales.push(sale);
        }
        
        res.status(201).json({
            payload: sales,
            message: "Success"
        })
    }
    catch (error) {
        res.status(200).json({
            payload: [],
            message: error.message
        })
    }
})

sales.delete("/:id/:count", verify_admin, async (req, res) => {
    try{
        const saleid = req.params.id;
        const count = req.params.count;

        const sale = await Sales.findById(saleid);
        
        const product = await Product.findByIdAndUpdate({ _id: sale.product._id}, {
            $inc: {
                number_in_stock: count
            },
        },  { new: true });

        await Sales.findByIdAndDelete(saleid);

        res.status(200).json({
            payload: product,
            message: "Success"
        })
    }
    catch(error){
        res.status(500).json({
            payload: [],
            message: error.message
        })
    }
})

sales.get("/today", verify_admin, async (req, res) => {
    const sales = await Sales.find({date: timeformatter(new Date())}).populate("product");
    res.status(200).json({
        payload: sales
    })
})

sales.get("/all", verify_admin, async (req, res) => {
    const sales = await Sales.find({}).populate("product");
    res.status(200).json({
        payload: sales,
        total: sales.length
    })
})


module.exports = sales