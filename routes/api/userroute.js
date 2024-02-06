import { Router } from "express";
import usersController from "../../controllers/usersController.js";
const router = Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route("/:username?")
  .get(usersController.getUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

export default router;
