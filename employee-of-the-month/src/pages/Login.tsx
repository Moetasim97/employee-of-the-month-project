import { Container, Grid } from "@mui/material";
import LoginForm from "../components/LoginForm/LoginForm";
const LoginPage: React.FC = () => {
  return (
    <Container>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
