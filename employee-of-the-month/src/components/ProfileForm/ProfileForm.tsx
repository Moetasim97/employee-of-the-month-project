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
import { useAuthLoggedInUser, useAuthState } from "../../context/Auth";

interface ProfileFormProps {
  handleEndEdit: () => void;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ handleEndEdit }) => {
  const { loadUserData } = useAuthState();
  const user = useAuthLoggedInUser();
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/edit_employee/", {
      method: "post",
      body: JSON.stringify({ id: user.id, ...state }),
    });
    await loadUserData();
  };

  return (
    <Card component={"form"} onSubmit={handleSubmit}>
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
        <Button type={"submit"} startIcon={<Save />}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileForm;
