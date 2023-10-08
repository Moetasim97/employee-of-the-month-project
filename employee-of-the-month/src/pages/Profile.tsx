import { Edit, KeyboardArrowLeft } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm/ProfileForm";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return <ProfileForm handleEndEdit={() => setIsEditing(false)} />;
  }
  return (
    <Paper sx={{ p: 4 }}>
      <Stack direction={"row"} justifyContent={"space-between"} p={2}>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <IconButton onClick={() => navigate("/")}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography variant={"h5"}>Profile</Typography>
        </Stack>
        <Button startIcon={<Edit />} onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </Stack>
      <Divider />
      <ProfileInfo />
    </Paper>
  );
};

export default ProfilePage;
