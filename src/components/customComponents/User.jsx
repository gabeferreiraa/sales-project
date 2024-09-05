import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = ({ user, deleteUser }) => {
  return (
    <div className="flex flex-col space-y-2 border p-2 rounded-md">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <AvatarFallback>{`${user.first_name[0]}${user.last_name[0]}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className={user.is_lead ? "font-bold text-black" : ""}>
            {`${user.first_name} ${user.last_name}`}
          </span>
          <span>{user.job_title}</span>
        </div>
      </div>
      <textarea
        placeholder="User Notes"
        value={user.notes}
        onChange={(e) => handleUserNotesChange(e, user.email)}
        className="border rounded-md p-2"
      />
      <Button
        onClick={() => deleteUser(user.id)}
        variant="destructive"
        className="mt-2"
      >
        Delete User
      </Button>
    </div>
  );
};

export default UserProfile;
