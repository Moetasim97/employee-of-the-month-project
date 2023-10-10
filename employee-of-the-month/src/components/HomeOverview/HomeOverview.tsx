import { EmojiEvents, MilitaryTech } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Grid, Stack } from "@mui/material";
import { useAuthState } from "context/Auth";
import AwardProfileCard from "./AwardProfileCard/AwardProfileCard";
import CurrentWinnerCard from "./AwardProfileCard/CurrentWinnerActions/CurrentWinnerActions";
import { useEffect, useState } from "react";
import { User } from "types/User";

const HomeOverview: React.FC = () => {
  const { user } = useAuthState();
  const [topEmployees, setTopEmployees] = useState<User[]>([]);
  const [employeeOfTheMonth, setEmployeeOfTheMonth] = useState<User>();

  useEffect(() => {
    fetchTopEmployees();
    fetchEmployeeOfTheMonth();
  }, []);

  const fetchTopEmployees = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/all_time_winners/");
      const data: User[] = await response.json();
      setTopEmployees(data);
    } catch (error) {
      console.error("Error fetching top employees:", error);
    }
  };
  const fetchEmployeeOfTheMonth = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/retrieve_winner/");
      const data: User = await response.json();
      setEmployeeOfTheMonth(data);
    } catch (error) {
      console.error("Error fetching employee of the month:", error);
    }
  };
  if (!employeeOfTheMonth) return <p>loading ....</p>;
  return (
    <Stack gap={2}>
      <AwardProfileCard
        AwardIcon={MilitaryTech}
        user={employeeOfTheMonth}
        recognitions={employeeOfTheMonth.counter}
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
                  recognitions={user.counter}
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
