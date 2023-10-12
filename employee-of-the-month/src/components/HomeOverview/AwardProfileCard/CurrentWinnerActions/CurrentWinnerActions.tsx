import { Message, ThumbUp } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthState } from "context/Auth";
import { useState } from "react";

const CurrentWinnerCard: React.FC = () => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuthState();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8001/submit_interaction", {
        body: JSON.stringify({
          employee_id: user?.id,
          comment,
          likes: isLiked,
        }),
        method: "post",
      });
      const data = await res.json();
      setComments(data.slice(0, -1).map((entry: any) => entry.comment));
      setLikes(data.at(-1).likes);
    } catch (error) {
      console.log(error);
    }
  };
  if (comments.length > 0) {
    return (
      <Stack>
        <Typography>Likes {likes}</Typography>
        <Divider />
        <Typography>Comments</Typography>
        {comments.map((comment) => (
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography>{comment}</Typography>
          </Stack>
        ))}
      </Stack>
    );
  }
  return (
    <Stack
      width={"100%"}
      direction="row"
      gap={2}
      justifyContent={"center"}
      alignItems={"flex-end"}
      component={"form"}
      onSubmit={handleComment}
    >
      <IconButton
        color={isLiked ? "primary" : "default"}
        size="small"
        onClick={(e) => setIsLiked(!isLiked)}
      >
        <ThumbUp />
      </IconButton>
      <TextField
        label="Leave a Comment"
        variant="standard"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
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
