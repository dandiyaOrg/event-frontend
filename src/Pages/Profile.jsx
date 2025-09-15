import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../Components/ProfileCard";
import ProfileSidebar from "../Components/ProfileSidebar";
import BioGraph from "../Components/ProfileBio";

const UserProfilePage = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user); // Get logged-in user details

  if (!isLogin || !user) {
    return null; // Or redirect to login page or show a message
  }

  // Map your user data keys accordingly (adjust based on your stored user structure)
  const {
    image,
    name,
    email,
    firstName,
    lastName,
    country,
    birthday,
    occupation,
    mobile,
    phone,
  } = user;

  return (
    <div className="rounded-2xl">
      <div className="bg-gray-600 rounded-t-2xl flex gap-0 justify-evenly">
        <ProfileCard image={image} name={name || `${firstName} ${lastName}`} email={email} />
        <ProfileSidebar />
      </div>
      <div className="bottom-0 h-80">
        <BioGraph
          firstName={firstName}
          lastName={lastName}
          country={country}
          birthday={birthday}
          occupation={occupation}
          mobile={mobile}
          email={email}
          phone={phone}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
