import { h } from "preact";
import { Link } from "preact-router/match";
import usersJson from "../assets/data/users.json";

const Sidebar = () => {
  const username = "hacker_420";
  const currentUser = usersJson.find((p) => p.username === username);

  const friendsList = currentUser.friends.map((friend) => {
    const friendData = usersJson.find((user) => user.username === friend);
    return (
      <li class="list-group-item bg-light">
        <Link
          class="text-decoration-none"
          activeClassName="active"
          href={`/profile/${friend}`}
        >
          <img
            src={friendData.profilepic}
            style="width:25%;aspect-ratio:1/1;object-fit:cover;margin-right:1rem;"
            alt={friend}
          />
          {friendData.firstname} {friendData.lastname}
        </Link>
      </li>
    );
  });

  return (
    <div class="sticky-top p-3" style="top:4rem">
      <a
        href={`/profile/${username}`}
        class="d-inline-flex text-decoration-none"
      >
        <div>
          <img
            src={currentUser.profilepic}
            alt="Profile Picture"
            class="float-left"
            style="width:100px;aspect-ratio:1/1;object-fit:cover;"
          />
        </div>
        <div class="px-3">
          <h3>
            {currentUser.firstname} {currentUser.lastname}
          </h3>
          <p class="text-muted">@{currentUser.username}</p>
        </div>
      </a>
      <div class="py-3">
        <h3>Friends</h3>
        <ul class="list-group">{friendsList}</ul>
      </div>
    </div>
  );
};

export default Sidebar;
