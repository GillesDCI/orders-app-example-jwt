import { useContext } from "react";
import { AppContext } from "../../App";

export default function Greeting() {
  const { username } = useContext(AppContext);

  return (
    <>
      <h1>Welcome back, {username}</h1>
    </>
  );
}
