import { h } from 'preact';
import { Link } from 'preact-router/match';

const Navbar = () => (
    <nav>
        <Link href="/">
            <h1 class="title"><span class="green">Our</span> <span class="pink">Kitchen</span></h1>
        </Link>
        <div class="nav-inner">
            <div class="nav-items">
                <Link activeClassName="active" href="/feed"><i class="bi bi-house"></i> Feed</Link>
                <Link activeClassName="active" href="/savedrecipes"><i class="bi bi-bookmark"></i> Saved Recipes</Link>
                <Link activeClassName="active" href="/recipes"><i class="bi bi-journals"></i> Recipes</Link>
                <Link activeClassName="active" href="/lists"><i class="bi bi-list-task"></i> Lists</Link>
                <Link activeClassName="active" href="/pantries"><i class="bi bi-bookshelf"></i> Pantries</Link>
            </div>
            
            <div class="user-info">
                <Link activeClassName="active" class="brown" href="/profile"><img src="https://i.ytimg.com/vi/US-rsVhRREA/maxresdefault.jpg" class="avatar" alt="Avatar" /><p class="avatar-text"> Buddy Holly</p></Link>
                <Link activeClassName="active" class="green" href="/settings"><i class="bi bi-gear"></i> Settings</Link>
                <Link class="green" href="/logout"><i class="bi bi-door-open"></i> Logout</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;