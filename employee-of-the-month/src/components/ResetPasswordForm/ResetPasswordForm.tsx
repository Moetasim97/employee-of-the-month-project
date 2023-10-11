import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ResetPasswordFormProps {
  handleEnd: () => void;
  email: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email = "",
  handleEnd,
}) => {
  const [state, setState] = useState({ email, password: "" });
  const [status, setStatus] = useState<
    "loading" | "idle" | "error" | "success"
  >("idle");
  const handleResetPassword = async () => {
    setStatus("loading");
    try {
      await fetch("http://127.0.0.1:8001/reset_password", {
        method: "put",
        body: JSON.stringify({
          username: state.email,
          password: state.password,
        }),
      });

      setStatus("success");
      handleEnd();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };
  if (status === "loading") {
    return <p>Loading ...</p>;
  }
  if (status === "success") {
    return <p>success... redirecting to login</p>;
  }
  return (
    <Card component={"form"}>
      <CardHeader
        title={
          <Stack direction={"row"} gap={2}>
            <IconButton onClick={handleEnd}>
              <KeyboardArrowLeft />
            </IconButton>
            <Typography variant="h5">Reset Password</Typography>
          </Stack>
        }
      />

      <CardContent>
        {status === "error" ? <p>Invalid username or weak password</p> : null}
        <TextField
          label="Email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleResetPassword} fullWidth>
          Reset Password
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResetPasswordForm;
