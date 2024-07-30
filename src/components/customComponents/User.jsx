import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = ({ user, handleUserNotesChange }) => {
  return (
    <div className="flex flex-col space-y-2 border p-2 rounded-md">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback>{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className={user.is_lead ? "font-bold text-black" : ""}>
            {`${user.firstName} ${user.lastName}`}
          </span>
          <span>{user.jobTitle}</span>
        </div>
      </div>
      <textarea
        placeholder="User Notes"
        value={user.notes}
        onChange={(e) => handleUserNotesChange(e, user.email)}
        className="border rounded-md p-2"
      />
    </div>
  );
};

export default UserProfile;
