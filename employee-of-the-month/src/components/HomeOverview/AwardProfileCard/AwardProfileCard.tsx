import { Star, SvgIconComponent } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { User } from "types/User";

interface AwardProfileCardProps {
  AwardIcon: SvgIconComponent;
  awardTitle?: string;
  user: Pick<User, "id" | "name" | "photo" | "phone" | "counter" | "job_title">;
  recognitions: number;
  actions?: React.ReactNode;
}
const goldColor = "#FFD700";

const AwardProfileCard: React.FC<AwardProfileCardProps> = ({
  AwardIcon,
  awardTitle,
  user,
  recognitions,
  actions,
}) => {
  return (
    <Box position={"relative"}>
      <Box
        position={"absolute"}
        sx={{ top: 0, left: "50%", transform: "translate(-50%,-50%)" }}
      >
        <Icon
          sx={{ color: goldColor, borderRadius: 100, boxShadow: 1 }}
          fontSize={"large"}
        >
          <AwardIcon fontSize="large" />
        </Icon>
      </Box>
      <Card>
        {awardTitle && <CardHeader title={awardTitle} />}{" "}
        <CardContent>
          <Stack alignItems={"center"} gap={2}>
            <Avatar
              alt={user.name}
              sx={{ width: 200, height: 200, m: 2 }}
              src={"http://127.0.0.1:8000/" + user.photo}
            />

            <Typography variant="h6">
              {user.job_title} | {user.name}
            </Typography>
            <Stack gap={2} direction={"row"} alignItems={"center"}>
              <Icon sx={{ color: goldColor }}>
                <Star />
              </Icon>
              <Typography>{user.counter} Recognitions</Typography>
            </Stack>
            <Typography>{user.phone}</Typography>
          </Stack>
        </CardContent>
        {actions && <CardActions>{actions}</CardActions>}
      </Card>
    </Box>
  );
};

export default AwardProfileCard;
