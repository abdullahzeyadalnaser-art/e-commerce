const express = require(`express`);

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require(`../utils/valedator/brandValidator`);

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deletBrand,
} = require(`../serveces/brandSarveces`);

const router = express.Router();

router.route(`/`).get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)

  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deletBrand);

module.exports = router;
