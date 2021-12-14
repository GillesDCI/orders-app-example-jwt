import { useEffect, useState } from "react";
import axios from "axios";

export default function ListUsers() {
  const [users, setUsers] = useState([]);

  const getListOfusers = async () => {
    const response = await axios.get("http://localhost:3001/api/users/list", {
      withCredentials: true,
    });

    setUsers(response.data.users); // users[]
  };

  useEffect(() => {
    getListOfusers();
  }, []);

  return (
    <>
      <h1>List of users</h1>
      {users.map((user) => (
        <>
          <p>
            {user.email}, {user.firstname}
          </p>
        </>
      ))}
    </>
  );
}
