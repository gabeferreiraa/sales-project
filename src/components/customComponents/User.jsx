import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      <p>Organization: {user.org}</p>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
