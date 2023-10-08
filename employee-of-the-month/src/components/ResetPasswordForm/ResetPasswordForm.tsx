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
  email,
  handleEnd,
}) => {
  const [state, setState] = useState(email);
  const handleResetPassword = () => {
    console.log(state);
  };
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
        <TextField
          label="Email"
          value={state}
          onChange={(e) => setState(e.target.value)}
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
