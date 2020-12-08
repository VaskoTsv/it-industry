const { Router } = require("express");
const authorize = require("../middleware/authMiddleware");
const UserController = require("../controllers/UserController.js");

const router = new Router();

router.get("/:userId", authorize, UserController.getUser);
router.put("/:userId/bookmarked/:companyId", authorize, UserController.addToBookmarks);
router.delete("/:userId/bookmarked/:companyId", authorize, UserController.removeFromBookmarks);

module.exports = router;
