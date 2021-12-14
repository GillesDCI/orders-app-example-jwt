import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        data,
        {
          withCredentials: true,
        }
      );

      handleLogin(response.data.user.username);

      // redirect
      navigate("/list-users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" required={true} />
        </label>
        <label>
          Password
          <input name="password" type="password" required={true} />
        </label>
        <button>Login</button>
      </form>
    </>
  );
}
