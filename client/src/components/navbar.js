import { h } from 'preact';
import { Link } from 'preact-router/match';
const Navbar = () => (
    <nav>
        <a href="#"><h1 class="title"><span class="green">Our</span> <span class="pink">Kitchen</span></h1></a>
        <div class="nav-inner">
            <div class="nav-items">
                <a class="active" href="#feed"><i class="bi bi-house"></i> Feed</a>
                <a href="#saved-recipes"><i class="bi bi-bookmark"></i> Saved Recipes</a>
                <Link href="/recipes"><i class="bi bi-journals"></i> Recipes</Link>
                <a href="#lists"><i class="bi bi-list-task"></i> Lists</a>
                <a href="#pantries"><i class="bi bi-bookshelf"></i> Pantries</a>
            </div>
            
            <div class="user-info">
                <a class="brown" href="#profile"><img src="https://i.ytimg.com/vi/US-rsVhRREA/maxresdefault.jpg" class="avatar" alt="Avatar" /><p class="avatar-text"> Buddy Holly</p></a>
                <a class="green" href="#settings"><i class="bi bi-gear"></i> Settings</a>
                <a class="green" href="#logout"><i class="bi bi-door-open"></i> Logout</a>
            </div>
        </div>
      </nav>
    );

export default Navbar;
