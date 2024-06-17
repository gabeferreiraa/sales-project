import React from "react";
import { Button } from "../ui/button";

const Organization = (props) => {
  return (
    <div className="flex items-center justify-between border p-4 font-bold text-md">
      <h1>{props.orgName}</h1>
      <p>Users</p>
      <Button
        onClick={() => props.handleDeleteOrg(props.id)}
        className=" bg-red-500"
      >
        Delete Organization
      </Button>
    </div>
  );
};

export default Organization;
