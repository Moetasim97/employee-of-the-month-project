import { Message, ThumbUp } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";

interface CurrentWinnerCardProps {
  isLiked: boolean;
}

const CurrentWinnerCard: React.FC<CurrentWinnerCardProps> = ({ isLiked }) => {
  return (
    <Stack
      width={"100%"}
      direction="row"
      gap={2}
      justifyContent={"center"}
      alignItems={"flex-end"}
    >
      <IconButton color={isLiked ? "primary" : "default"} size="small">
        <ThumbUp />
      </IconButton>
      <TextField
        label="Leave a Comment"
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Message />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default CurrentWinnerCard;
