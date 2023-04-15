const { register } = require("../controller/userController");
const { login } = require("../controller/userController");
const { setAvatar } = require("../controller/userController");
const { getAllUsers } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);

module.exports = router;

