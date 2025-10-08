const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddelWare = require(`../../middeleWeres/validatorMiddelWare`);

exports.getCategoryValidator = [
  check(`id`).isMongoId().withMessage("invalid category id Format"),
  validatorMiddelWare,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage(`required`)
    .isLength({ min: 3 })
    .withMessage(`too short category name `)
    .isLength({ max: 32 })
    .withMessage(`too long category name`)
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddelWare,
];

exports.updateCategoryValidator = [
  check(`id`).isMongoId().withMessage("invalid category id Format"),
  body(`name`).custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddelWare,
];
exports.deleteCategoryValidator = [
  check(`id`).isMongoId().withMessage("invalid category id Format"),
  validatorMiddelWare,
];
