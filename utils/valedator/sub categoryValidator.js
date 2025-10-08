const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddelWare = require(`../../middeleWeres/validatorMiddelWare`);

exports.getSubCategoryValidator = [
  check(`id`).isMongoId().withMessage("invalid Subcategory id Format"),
  validatorMiddelWare,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage(` SubCategory required`)
    .isLength({ min: 2 })
    .withMessage(`too short Subcategory name `)
    .isLength({ max: 32 })
    .withMessage(`too long Subcategory name`)
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")

    .isMongoId()
    .withMessage("Invaled Category id format"),
  validatorMiddelWare,
];

exports.updateSubCategoryValidator = [
  check(`id`).isMongoId().withMessage("invalid Subcategory id Format"),
  body(`name`).custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddelWare,
];
exports.deleteSubCategoryValidator = [
  check(`id`).isMongoId().withMessage("invalid Subcategory id Format"),
  validatorMiddelWare,
];
