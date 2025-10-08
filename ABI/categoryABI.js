const express = require(`express`);

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require(`../utils/valedator/categoryValidator`);

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deletCategory,
} = require(`../serveces/categorySarveces`);

const router = express.Router();
const subcategoryAbi = require(`./subcategoryAbi`);
//  router.get(`/` , getCategories);
//  router.post(`/` , createCategory)
router.use(`/:categoryId/subcategories`, subcategoryAbi);
router
  .route(`/`)
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)

  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deletCategory);

module.exports = router;
