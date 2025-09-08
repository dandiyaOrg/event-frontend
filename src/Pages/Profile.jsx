import React from "react";
import ProfileCard from "../Components/ProfileCard";
import ProfileSidebar from "../Components/ProfileSidebar";
import BioGraph from "../Components/ProfileBio";

const UserProfilePage = () => {
  const user = {
    image: "https://i-yacht.de/wp-content/uploads/2024/01/Hannes.png",
    name: "Camila Smith",
    email: "deydey@theEmail.com",
  };

  const userProfile = {
  firstName: "Camila",
  lastName: "Smith",
  country: "Australia",
  birthday: "13 July 1983",
  occupation: "UI Designer",
  mobile: "(12) 03 4567890",
  email: "jsmith@flatlab.com",
  phone: "88 (02) 123456",
};

  return (
    <div className="  rounded-2xl">
      <div className="bg-gray-600 rounded-t-2xl  flex gap-0 justify-evenly ">
        <ProfileCard image={user.image} name={user.name} email={user.email} />
        <ProfileSidebar />
      </div>
      <div className="bottom-0 h-80">
              <BioGraph
        firstName={userProfile.firstName}
        lastName={userProfile.lastName}
        country={userProfile.country}
        birthday={userProfile.birthday}
        occupation={userProfile.occupation}
        mobile={userProfile.mobile}
        email={userProfile.email}
        phone={userProfile.phone}
      />
      </div>
    </div>
  );
};

export default UserProfilePage;
