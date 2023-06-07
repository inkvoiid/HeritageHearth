import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();
    
    
    if(user){
        const handleEdit = () => navigate(`/users/${userId}`);

        const userRecipesString = user.recipes.toString().replaceAll(',', ', ');

        return (
            <div className="User" onClick={handleEdit}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{userRecipesString}</p>
            </div>
        );
    }
    else{
        return null;
    }
    }

export default User;