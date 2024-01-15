const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

const check_product_duplication = async (req, res, next) => {
    const { product_name } = req.body
    const product = await Product.findOne({product_name})
    if(product){
        fs.readdir("/tmp", (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join("tmp", file), (err) => {
                  if (err) throw err;
                });
            }
          });
        return res.status(400).json({
            message: "This product already exists"
        })
    }
    next()
}

module.exports = check_product_duplication