const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const ApiFeatures = require(`../utils/apiFeatures`);
const factory = require(`./handlersFactory`);
const product = require("../models/productMopdel"); // تصحيح اسم الملف
// const { query } = require("express");

//@desc  Get list of products
//@route  GET /api/v1/products
//@access  Public
exports.getproducts = asyncHandler(async (req, res) => {
  //  Build query
  const documentCounts = await product.countDocuments();
  const apiFeatures = new ApiFeatures(product.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search("products")
    .limitFfields()
    .sort();

  // Exeute qurey
  const { mongoosQuery, paginationResult } = apiFeatures;
  const products = await mongoosQuery;

  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

//@desc     Get specific product by id
//@route    GET /api/v1/products/:id
//@access   Public
exports.getproduct = factory.getOne(product);

//@desc   Create product
//@route  POST /api/v1/products
//@access Private
exports.createproduct = factory.createOne(product);

//@desc   Update specific product
//@route  PUT /api/v1/products/:id
//@access Private
exports.updateproduct = factory.updateOne(product);

//@desc   Delete specific product
//@route  DELETE /api/v1/products/:id
//@access Private
exports.deleteproduct = factory.delete0ne(product);
