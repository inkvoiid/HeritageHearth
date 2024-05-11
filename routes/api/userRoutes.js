import { Router } from "express";
import usersController from "../../controllers/usersController.js";
import verifyJWT from "../../middleware/verifyJWT.js";
const router = Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route("/:username?")
  .get(usersController.getUser)
  .put(verifyJWT, usersController.updateUser)
  .delete(verifyJWT, usersController.deleteUser);

export default router;
