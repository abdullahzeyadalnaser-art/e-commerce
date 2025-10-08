const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const ApiFeatures = require(`../utils/apiFeatures`);

exports.delete0ne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new apiError(`no category for this id ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new apiError(`no category for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: brand });
  });
exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDOc = await Model.create(req.body);
    res.status(201).json({ data: newDOc });
  });
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new apiError(`no document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
exports.getAll = (Model) => {
  asyncHandler(async (req, res) => {
    //  Build query
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const documentCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentCounts)
      .filter()
      .search()
      .limitFfields()
      .sort();

    // Exeute qurey
    const { mongoosQuery, paginationResult } = apiFeatures;
    const documents = await mongoosQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
};
