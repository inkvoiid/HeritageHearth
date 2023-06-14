import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { DropdownList } from 'react-widgets'
import { toast } from "react-toastify";

const RecipeForm = () => {

    const { register, handleSubmit, errors } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/api/recipes", data);
            if (response.status === 201) {
                toast.success(`Successfully created ${data.title}`);
                navigate('/recipe/'+data.recipeId);
            }
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
              } else {
                console.error(error);
              }
        }
    };
    const [creatorsList, setCreatorsList] = useState([]);

    useEffect(() => {
      // Fetch users from the server using an API endpoint
      axios
        .get("http://localhost:5000/api/users")
        .then((response) => {
          // Extract usernames from the response data
          const usernames = response.data.map((user) => user.username);
          setCreatorsList(usernames);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Recipe Title:</label>
                <input type="text" {...register("name",{ required: true })} />

                {errors?.username && <span>This field is required</span>}
            </div>

            <div>
                <label>Creator:</label>
                <DropdownList
                    data={creatorsList}
                />
            </div>
        </form>
    );

};


export default RecipeForm;