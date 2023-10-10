import { Cancel, Save } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuthState } from "../../context/Auth";
import { User } from "../../types/User";

interface ProfileFormProps {
  handleEndEdit: () => void;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ handleEndEdit }) => {
  const { user } = useAuthState() as { user: User };
  const [state, setState] = useState({
    name: user.name,
    title: user.job_title,
    phone: user.phone,
    profileImage: user.phone,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const editableFields = [
    {
      label: "Name",
      value: state.name,
      name: "name",
    },
    {
      label: "Title",
      value: state.title,
      name: "title",
    },

    {
      label: "Phone",
      value: state.phone,
      name: "phone",
    },
  ];
  return (
    <Card>
      <CardHeader
        title="Edit Profile"
        action={
          <Button startIcon={<Cancel />} onClick={handleEndEdit} color="error">
            Cancel
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {editableFields.map((item) => (
            <Grid item xs={12} key={item.label}>
              <TextField
                label={item.label}
                value={item.value}
                name={item.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button startIcon={<Save />}>Save</Button>
      </CardActions>
    </Card>
  );
};

export default ProfileForm;
