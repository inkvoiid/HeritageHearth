import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecipePreview = ({ recipe }) => {

    const [creatorName, setCreatorName] = useState("");

    useEffect(() => {
        // Fetch creator data based on the creatorId
        const fetchCreator = async () => {
            try {
                if (recipe.creator) {
                    const creatorResponse = await axios.get(
                        `http://localhost:5000/api/users/${recipe.creator}`
                    );
                    const creatorData = creatorResponse.data;
                    setCreatorName(creatorData.firstName + " " + creatorData.lastName);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCreator();
    }, [recipe.creator]);

    return (
        <article>
            <p><b><Link to={"/recipe/"+ recipe.recipeId}>{recipe.name}</Link></b> by <Link to={"/profile/" + recipe.creator}>{creatorName}</Link></p>
            <p>Serving Size: {recipe.servingSize} | Cooking Time: {recipe.cookingTime.length} {recipe.cookingTime.unit}</p>
        </article>
    );
};

export default RecipePreview;