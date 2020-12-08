const { Router } = require("express");
const CompanyController = require("../controllers/CompanyController.js");

const router = Router();

router.post("/list", CompanyController.list);
router.post("/list/statistics", CompanyController.statistics);

module.exports = router;
