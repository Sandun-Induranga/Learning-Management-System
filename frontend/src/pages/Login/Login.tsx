import { Person2, Password } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import api from "../../api";

const Login = () => {
  const getUser = () => {
    api
      .get("user/")
      .then((res) => {})
      .catch((error) => {});
  };

  return (
    <main className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-4xl text-sky-edited-500 font-semibold">
        Online Learning
      </h1>
      <form className="md:w-1/4 flex flex-col items-center gap-y-5">
        <TextField
          type="text"
          label={
            <span className="flex items-center gap-4">
              <Person2 className="!text-4xl" />
              Username
            </span>
          }
          fullWidth
          className="!border-sky-edited-500"
        ></TextField>
        <TextField
          type="password"
          label={
            <span className="flex items-center gap-4">
              <Password className="!text-4xl" />
              Password
            </span>
          }
          fullWidth
          className="!border-sky-edited-500"
        ></TextField>
        <FormControlLabel
          className="my-4"
          control={<Checkbox />}
          label="Remember Me"
        />
        <NavLink className="w-full" to={"/student"}>
          <Button variant="contained" fullWidth className="!bg-sky-edited-500">
            Login
          </Button>
        </NavLink>
      </form>
    </main>
  );
};

export default Login;
