const slugify = require(`slugify`);
const asyncHandler = require("express-async-handler");
const apiError = require(`../utils/apiError`);

const AbiFeatures = require(`../utils/apiFeatures`);
const Category = require(`../models/categoryModel`);
const CategoryModel = require(`../models/categoryModel`);
const factory = require(`./handlersFactory`);

//@desc  Get list of categories
//@rout  Get /api/v1/categories
//access  public
exports.getCategories = asyncHandler(async (req, res) => {
  //  Build query
  const documentCounts = await Category.countDocuments();
  const apiFeatures = new AbiFeatures(Category.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFfields()
    .sort();

  // Exeute qurey
  const { mongoosQuery, paginationResult } = apiFeatures;
  const categories = await mongoosQuery;

  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
});

//@desc     Get specific category by id
//@route    Get    /api/v1/catergories/:id
//@access   Public

exports.getCategory = factory.getOne(Category);

//@desc   create category
//@route POST    /api/v1/catergories
//@access privat
exports.createCategory = factory.createOne(Category);

//@desc       ubdate speecfic caregory
//@route       PUT  /api/v1/catergories/:id
//@access      privat
exports.updateCategory = factory.updateOne(Category);

//@desc       delete speecfic caregory
//@route       delet  /api/v1/catergories/:id
//@access      privat

exports.deletCategory = factory.delete0ne(Category);
