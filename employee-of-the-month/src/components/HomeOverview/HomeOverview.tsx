import { EmojiEvents, MilitaryTech } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Grid, Stack } from "@mui/material";
import { useAuthState } from "context/Auth";
import { dummyUser } from "types/User";
import AwardProfileCard from "./AwardProfileCard/AwardProfileCard";
import CurrentWinnerCard from "./AwardProfileCard/CurrentWinnerActions/CurrentWinnerActions";

const topEmployees = [dummyUser, dummyUser, dummyUser, dummyUser, dummyUser];
const HomeOverview: React.FC = () => {
  const { user } = useAuthState();
  return (
    <Stack gap={2}>
      <AwardProfileCard
        AwardIcon={MilitaryTech}
        user={dummyUser}
        recognitions={dummyUser.monthlyRecognitions}
        awardTitle="Current Monthly Winner"
        actions={user ? <CurrentWinnerCard isLiked={true} /> : null}
      />
      <Card>
        <CardHeader title="All-time hall of fame" />
        <CardContent>
          <Grid container columnSpacing={2} rowSpacing={5}>
            {topEmployees.map((user) => (
              <Grid item xs={12} sm={6} md={4}>
                <AwardProfileCard
                  AwardIcon={EmojiEvents}
                  user={user}
                  recognitions={user.totalRecognitions}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};
export default HomeOverview;
