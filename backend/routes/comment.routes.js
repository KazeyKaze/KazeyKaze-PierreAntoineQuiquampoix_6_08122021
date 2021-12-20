const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");

///////////////////////////////
// ROUTER
///////////////////////////////
router.post("/:id", auth, commentCtrl.createComment);
// router.put("/:id", auth, commentCtrl.modifyComment);
// router.delete("/:id", auth, commentCtrl.deleteComment);
// router.get("/", auth, commentCtrl.getAllComment);
// router.get("/:id", auth, commentCtrl.getOneComment);

module.exports = router;
