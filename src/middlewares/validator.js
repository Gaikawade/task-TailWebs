const { check, validationResult } = require("express-validator");

exports.userValidator = [
    check("name").trim().not().isEmpty().withMessage("Name is missing"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is missing")
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be 8 to 20 characters long"),
];

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is missing")
];

exports.studentValidation = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("id").trim().not().isEmpty().withMessage("Student Id is missing"),
  check("subject").trim().not().isEmpty().withMessage("Subject is missing"),
  check("marks").trim().not().isEmpty().withMessage("Marks are missing")
];

exports.validate = (req, res, next) => {
  const err = validationResult(req).array();
  if(err.length){
    return res.status(400).json({msg: err[0].msg});
  }
  next();
}