import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.userState.user);
  const { username, email, profilePhoto } = user;
  const img = profilePhoto
    ? `http://localhost:5000/api/image/${user.profilePhoto}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDKWUgyPYinvZYb-8lbLAsCPp4j_toM09lQ&s";

  return (
    <div className="flex justify-evenly gap-20 h-96 relative">
      <div className="avatar h-64">
        <div className="w-auto h-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={img} />
        </div>
      </div>

      <div className=" flex flex-col font-bold gap-6">
        <h2 className="text-2xl font-extrabold text-secondary">{username}</h2>
        <p>email : {email}</p>
        <NavLink to="update_profile">
          <button className="btn btn-success ">Edit profile</button>
        </NavLink>
        <NavLink to="update_password">
          <button className="btn btn-error ">Change password</button>
        </NavLink>
      </div>
    </div>
  );
};
export default ProfilePage;
