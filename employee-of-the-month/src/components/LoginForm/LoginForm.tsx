import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuthState } from "../../context/Auth";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import { User } from "types/User";

const Login: React.FC = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { login } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsInvalid(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/validate_user/", {
        method: "post",
        body: JSON.stringify({
          username: state.email,
          password: state.password,
        }),
      });
      const data: User = await response.json();
      const userResponse = await fetch(
        `http://127.0.0.1:8000/return_employee/${data.id}/`
      );
      const user: User = await userResponse.json();
      login(user);
    } catch (error) {
      setIsInvalid(true);
      console.error("Error fetching employee of the month:", error);
    }
    setIsLoading(false);
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
        <Button
          type="submit"
          color="primary"
          fullWidth
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={10} /> : null}
        >
          Login
        </Button>
        {isInvalid && <Typography>Invalid Credentials</Typography>}
      </CardActions>
    </Card>
  );
};

export default Login;
