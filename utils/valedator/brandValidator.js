const { check, body } = require("express-validator");
const validatorMiddelWare = require(`../../middeleWeres/validatorMiddelWare`);
const { default: slugify } = require("slugify");

exports.getBrandValidator = [
  check(`id`).isMongoId().withMessage("invalid category id Format"),
  validatorMiddelWare,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage(`Brand required`)
    .isLength({ min: 3 })
    .withMessage(`too short Brand name `)
    .isLength({ max: 32 })
    .withMessage(`too long Brand name`),
  body(`name`).custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddelWare,
];

exports.updateBrandValidator = [
  check(`id`).isMongoId().withMessage("invalid Brand id Format"),
  body(`name`).custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddelWare,
];
exports.deleteBrandValidator = [
  check(`id`).isMongoId().withMessage("invalid Brand id Format"),
  validatorMiddelWare,
];
