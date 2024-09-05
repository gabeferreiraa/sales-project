import React, { useEffect, useState } from "react";

import { API_URL } from "@/lib/urls";

const UsersDisplay = ({ id }) => {
  // make a request to server & get users
  // render the users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/organizations/${id}/users`, {
        mode: "cors",
        credentials: "include",
      });

      const data = await res.json();
      setUsers(data.users);
      console.log(data);
    })();
  }, [id]);

  const fullName = (user) => user.first_name + " " + user.last_name;

  return (
    <div>
      {users.map((user) => {
        return <p key={user.id}>{fullName(user)}</p>;
      })}
    </div>
  );
};

export default UsersDisplay;
