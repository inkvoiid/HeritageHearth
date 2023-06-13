import { useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    const { register, handleSubmit, errors } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users", data);
            if (response.status === 201) {
                toast.success('User created successfully');
                navigate('/login');
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
            <label>First Name:</label>
            <input
              type="text"
              {...register("firstName",{ required: true })}
            />
            {errors?.firstName && <span>This field is required</span>}
          </div>
    
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              {...register("lastName",{ required: true })}
            />
            {errors?.lastName && <span>This field is required</span>}
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
            <button type="submit">Create User</button>
          </div>
        </form>
    );

};


export default Register;