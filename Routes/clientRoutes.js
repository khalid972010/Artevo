const express = require("express");
const router = express.Router();
const clientController = require("../Controllers/clientController");

//#region Get All Clients
router.get("/", clientController.getAllClients);
//#endregion

//#region Get Client by id
router.get("/:id", clientController.getClient);
//#endregion

//#region Create Client
router.post("/", clientController.createClient);
//#endregion
module.exports = router;
