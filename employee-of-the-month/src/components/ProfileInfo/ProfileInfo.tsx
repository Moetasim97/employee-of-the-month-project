import { Email, Home, Phone } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Grid,
  Icon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useAuthState } from "../../context/Auth";

interface ProfileProps {}

const ProfileInfo: React.FC<ProfileProps> = () => {
  const { user } = useAuthState();
  if (!user) return <div>Not Authorized</div>;

  const contactUsItems = [
    // {
    //   label: "Email",
    //   icon: <Email />,
    //   value: user.email,
    // },
    {
      label: "Phone",
      icon: <Phone />,
      value: user.phone,
    },
    // {
    //   label: "Address",
    //   icon: <Home />,
    //   value: user.address,
    // },
  ];
  return (
    <Stack alignItems={"center"}>
      <Avatar
        alt={user.name}
        sx={{ width: 200, height: 200, m: 5 }}
        src={user.photo}
      />
      <Typography variant={"h4"}>{user.name}</Typography>
      <Typography variant={"h5"}>{user.job_title}</Typography>
      <Paper elevation={1} sx={{ p: 2, m: 2, width: "100%" }}>
        <Stack gap={2}>
          <Typography variant={"h6"}>Contact Information</Typography>
          <Divider />
          <Grid container>
            {contactUsItems.map((item) => (
              <Grid item xs={12} sm={4} key={item.label}>
                <Stack direction={"row"} gap={1}>
                  <Icon>{item.icon}</Icon>
                  <Typography variant={"body1"}>
                    {item.label}: {item.value}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ProfileInfo;
