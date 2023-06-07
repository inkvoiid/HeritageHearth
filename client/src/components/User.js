import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersApiSlice';

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();
    
    
    if(user){
        const handleEdit = () => navigate(`/profile/${userId}`);

        const userFriendsString = user.friends.toString().replaceAll(',', ', ');
        const userSavedRecipesString = user.savedRecipes.toString().replaceAll(',', ', ');
        const userRecipesString = user.recipes.toString().replaceAll(',', ', ');
        const userPantriesString = user.pantries.toString().replaceAll(',', ', ');
        const userListsString = user.lists.toString().replaceAll(',', ', ');
        return (
            <div className="User" onClick={handleEdit}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Friends: {userFriendsString}</p>
            <p>Saved Recipes: {userSavedRecipesString}</p>
            <p>Recipes: {userRecipesString}</p>
            <p>Pantries: {userPantriesString}</p>
            <p>Lists: {userListsString}</p>
            </div>
        );
    }
    else{
        return null;
    }
    }

export default User;