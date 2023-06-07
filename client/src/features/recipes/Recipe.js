import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './recipesApiSlice';

const User = ({ recipeId }) => {
    const recipe = useSelector(state => selectUserById(state, recipeId));
    const navigate = useNavigate();
    
    
    if(recipe){
        const handleEdit = () => navigate(`/recipes/${recipeId}`);

        const recipeLikedByString = recipe.likedBy.toString().replaceAll(',', ', ');
        const recipeForkRecipesString = recipe.forkRecipeIds.toString().replaceAll(',', ', ');


        return (
            <div className="User" onClick={handleEdit}>
            <h3>{recipe.name}</h3>
            <p>by {recipe.creator}</p>
            <p>Recipe Image {recipe.recipeImage}</p>
            <p>Liked by: {recipeLikedByString}</p>
            <p>Description: {recipe.description}</p>
            {forkRecipeIds.length > 0 ? <p>Forked from: {recipe.forkedFrom}</p> : null}
            {forkRecipeIds.length > 0 ? <p>Forked to: {recipeForkRecipesString}</p> : null}
            <p>Serving Size: {recipe.servingSize}</p>
            <p>Cooking Time: {recipe.cookingTime.length} {recipe.cookingTime.unit}</p>
            <p>Ingredients</p>
            <ul>
                {recipe.ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                ))}
            </ul>
            <p>Instructions</p>
            <ol>
                {recipe.instructions.map((instruction) => (
                    <li>{instruction}</li>
                ))}
            </ol>
            <p>Comments</p>
            <ul>
                {recipe.comments.map((comment) => (
                    <li>{comment}</li>
                ))}
            </ul>
            </div>
        );
    }
    else{
        return null;
    }
    }

export default User;