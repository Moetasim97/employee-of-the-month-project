import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { dummyUser } from "types/User";
import { useAuthState } from "../../context/Auth";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";

const Login: React.FC = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { login } = useAuthState();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(dummyUser);
  };
  if (isResetPassword) {
    return (
      <ResetPasswordForm
        email={state.email}
        handleEnd={() => setIsResetPassword(false)}
      />
    );
  }
  return (
    <Card component={"form"} onSubmit={handleSubmit}>
      <CardHeader title="Login" />
      <CardContent>
        <Stack gap={2}>
          <TextField
            label="Email"
            value={state.email}
            name="email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={state.password}
            name="password"
            onChange={handleChange}
            fullWidth
          />
          <Typography
            variant={"body2"}
            sx={{ cursor: "pointer", mt: 1 }}
            onClick={() => setIsResetPassword(true)}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button type="submit" color="primary" fullWidth>
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
