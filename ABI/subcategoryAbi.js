const express = require(`express`);

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deletSubCategory,
  setCategoryIdBody,
  createFilterObject,
} = require(`../serveces/subCategoryService`);
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/valedator/sub categoryValidator");
//mergeParams : alliw us to access parameters on  ather router
//ex : we need to access categoryId from category routers
const router = express.Router({ mergeParams: true });

router
  .route(`/`)
  .post(setCategoryIdBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObject, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deletSubCategory);

module.exports = router;
