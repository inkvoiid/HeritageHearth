import { Router } from "express";
import recipesController from "../../controllers/recipesController.js";
import verifyJWT from "../../middleware/verifyJWT.js";
const router = Router();

router
  .route("/")
  .get(recipesController.getAllRecipes)
  .post(recipesController.createRecipe);

router.route("/latest").get(recipesController.getLatestRecipes);

router.route("/pending").get(recipesController.getAllPendingRecipes);

router.route("/previews").get(recipesController.getAllRecipePreviews);

router
  .route("/:recipeId?")
  .get(recipesController.getRecipe)
  .put(verifyJWT, recipesController.updateRecipe)
  .delete(verifyJWT, recipesController.deleteRecipe);

export default router;
