import { useContext } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

export default function Navigation() {
  const { loggedIn } = useContext(AppContext);

  return (
    <ul>
      {loggedIn ? (
        <li>
          <Link to="/logout">Logout</Link>
          <li>
            <Link to="/list-users">List Users</Link>
          </li>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </ul>
  );
}
