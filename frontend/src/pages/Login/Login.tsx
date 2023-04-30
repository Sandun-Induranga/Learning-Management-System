import { Checkbox, FormControlLabel, TextField } from "@mui/material";

const Login = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-4xl text-sky-edited-500">Online Learning</h1>
      <form className="w-1/4 flex flex-col gap-y-5">
        <TextField
          type="text"
          label="Username"
          fullWidth
          className="!border-sky-edited-500"
        ></TextField>
        <TextField
          type="password"
          label="Username"
          fullWidth
          className="!border-sky-edited-500"
        ></TextField>
        <FormControlLabel control={<Checkbox />} label="Remember Me" />
      </form>
    </main>
  );
};

export default Login;
