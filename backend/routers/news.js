
const express = require("express");
const users = require("../controller/crub.js");
const { body } = require("express-validator");
const validator = require("../validator/validator.js")
const router = express.Router();

router.get("/",users.showing);

router.post("/",[
    body("title").notEmpty().withMessage("title is required"),,
    body("description").notEmpty().withMessage("description is required"),,
    body("author").notEmpty().withMessage("author is required"),,
    body("type").notEmpty().withMessage("type is required"),
],validator,users.posting);

router.get("/:id",users.singleNews);
router.put("/:id",[
    body("title").notEmpty().withMessage("title is required"),body("description").notEmpty().withMessage("description is required"),,
    body("author").notEmpty().withMessage("author is required"),
    body("type").notEmpty().withMessage("type is required"),
],validator,users.Updating);

router.delete("/:id",users.Deleting);

module.exports = router;