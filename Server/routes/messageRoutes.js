const { addMessage } = require("../controller/messageController");
const { getAllMessage } = require("../controller/messageController");

const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessage);

module.exports = router;