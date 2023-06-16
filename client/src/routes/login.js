import { useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const { register, handleSubmit, errors } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth", data);
            if (response.status === 201) {
                toast.success(`Logged in, welcome ${data.username}.`);
                navigate(`/profile/${data.username}`);
            }
            console.log(response);
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              {...register("username",{ required: true })}
            />
            {errors?.username && <span>This field is required</span>}
          </div>
    
          <div>
            <label>Password:</label>
            <input
              type="password"
              {...register("password",{ required: true })}
            />
            {errors?.password && <span>This field is required</span>}
          </div>
    
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
    );

};


export default Login;