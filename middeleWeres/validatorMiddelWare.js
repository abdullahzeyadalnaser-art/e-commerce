const { validationResult } = require("express-validator");

// @ decs  finds the validation error in this reqest and warps them in an object with handy function

const validatorMiddelWare = (req, res, next) => {
  //2- middleware ==>catch error from ruls if exist
  //يتم تتبع الخطا قبل وصول req  الى الداتا بيس

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = validatorMiddelWare;
