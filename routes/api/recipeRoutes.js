import { Router } from "express";
import recipesController from "../../controllers/recipesController.js";
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
  .put(recipesController.updateRecipe)
  .delete(recipesController.deleteRecipe);

export default router;
