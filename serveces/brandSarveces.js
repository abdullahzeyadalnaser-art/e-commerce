const slugify = require(`slugify`);
const asyncHandler = require("express-async-handler");
const apiError = require(`../utils/apiError`);

const ApiFeatures = require(`../utils/apiFeatures`);
const factory = require(`./handlersFactory`);

const Brand = require(`../models/brandModel `);
//@desc  Get list of brands
//@rout  Get /api/v1/brands
//access  public
exports.getBrands = asyncHandler(async (req, res) => {
  //  Build query
  const documentCounts = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFfields()
    .sort();

  // Exeute qurey
  const { mongoosQuery, paginationResult } = apiFeatures;
  const brands = await mongoosQuery;

  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

//@desc     Get specific brand by id
//@route    Get    /api/v1/brands/:id
//@access   Public

exports.getBrand = factory.getOne(Brand);

//@desc   create brand
//@route POST    /api/v1/brands
//@access privat
exports.createBrand = factory.createOne(Brand);

//@desc       ubdate speecfic brand
//@route       PUT  /api/v1/brands/:id
//@access      privat
exports.updateBrand = factory.updateOne(Brand);

//@desc       delete speecfic brand
//@route       delet  /api/v1/brands/:id
//@access      privat

exports.deletBrand = factory.delete0ne(Brand);
