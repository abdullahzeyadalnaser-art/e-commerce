const slugify = require(`slugify`);
const asyncHandler = require("express-async-handler");
const apiError = require(`../utils/apiError`);

const AbiFeatures = require(`../utils/apiFeatures`);
const factory = require(`./handlersFactory`);
const SubCategory = require(`../models/subCategoryModel`);
exports.setCategoryIdBody = (req, res, next) => {
  //nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
//@desc   create subcategory
//@route POST    /api/v1/subcatergories
//@access privat
exports.createSubCategory = factory.createOne(SubCategory);

// Nested route
// GET  /abi/v1/caregories/:caregoryId/subcategories
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};
//@desc  Get list of subcategories
//@rout  Get /api/v1/subcategories
//access  public
exports.getSubCategories = asyncHandler(async (req, res) => {
  //  Build query
  const documentCounts = await SubCategory.countDocuments();
  const apiFeatures = new AbiFeatures(SubCategory.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFfields()
    .sort();

  // Exeute qurey
  const { mongoosQuery, paginationResult } = apiFeatures;
  const subCtegories = await mongoosQuery;

  res.status(200).json({
    results: subCtegories.length,
    paginationResult,
    data: subCtegories,
  });
});

//@desc     Get specific subcategory by id
//@route    Get    /api/v1/subcatergories/:id
//@access   Public

exports.getSubCategory = factory.getOne(SubCategory);

//@desc       ubdate speecfic subcaregory
//@route       PUT  /api/v1/subcatergories/:id
//@access      privat
exports.updateSubCategory = factory.updateOne(SubCategory);

//@desc       delete speecfic subcaregory
//@route       delet  /api/v1/subcatergories/:id
//@access      privat

exports.deletSubCategory = factory.delete0ne(SubCategory);

//http://localhost:3000/api/v1/subcatergories/:id
