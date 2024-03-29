import { Person2, Password } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

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
        setRole(res.data.responseData.role);

        switch (res.data.responseData.role) {
          case "Student":
            setRole(res.data.responseData.role);
            localStorage.setItem("currentUsername", username);
            localStorage.setItem("currentRole", "Student");
            navigate("/student", { replace: false });
            break;
          case "Teacher":
            localStorage.setItem("currentUsername", username);
            localStorage.setItem("currentRole", "Teacher");
            navigate("/teacher/batch", { replace: false });
            break;
          default:
            break;
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successful..!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something Went Wrong..!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (/^[A-z 0-9]{4,20}$/.test(value)) {
      document.getElementById(name)?.classList.remove("!text-red-700");
      document.getElementById(name)?.classList.add("!text-gray-700");
    } else {
      document.getElementById(name)?.classList.add("!text-red-700");
      document.getElementById(name)?.classList.remove("!text-gray-700");
    }

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

  return (
    <main className="flex justify-center items-center h-screen">
      <section className="flex flex-col justify-center items-center gap-y-10 border p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl text-blue-500 font-semibold">
          Online Learning
        </h1>
        <form
          className="w-full flex flex-col items-center gap-y-5"
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
            id="username"
            value={username}
            onChange={handleInputChange}
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
            id="password"
            value={password}
            onChange={handleInputChange}
          ></TextField>
          <FormControlLabel
            className="my-4"
            control={<Checkbox />}
            label="Remember Me"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Login
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
