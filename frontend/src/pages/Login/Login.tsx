import { Person2, Password } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../../api";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  const userLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let loginDetail = {
      username: username,
      password: password,
      role: role,
    };

    api
      .post("user", loginDetail)
      .then((res) => {
        setRole(res.data.responseData);

        switch (res.data.responseData) {
          case "Student":
            navigate("/student", { replace: true });
            break;
          case "Teacher":
            window.location.href = "http://localhost:5173/teacher";
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  return (
    <main className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-4xl text-sky-edited-500 font-semibold">
        Online Learning
      </h1>
      <form
        className="md:w-1/4 flex flex-col items-center gap-y-5"
        onSubmit={userLogin}
      >
        <TextField
          type="text"
          label={
            <span className="flex items-center gap-4">
              <Person2 className="!text-4xl" />
              Username
            </span>
          }
          fullWidth
          name="username"
          value={username}
          onChange={handleInputChange}
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
          name="password"
          value={password}
          onChange={handleInputChange}
          className="!border-sky-edited-500"
        ></TextField>
        <FormControlLabel
          className="my-4"
          control={<Checkbox />}
          label="Remember Me"
        />
        <Select value={role} onChange={handleChange}>
          <MenuItem value={"Student"}>Student</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="!bg-sky-edited-500"
        >
          Login
        </Button>
      </form>
    </main>
  );
};

export default Login;
