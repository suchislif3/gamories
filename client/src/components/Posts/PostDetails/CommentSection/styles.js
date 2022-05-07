import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  outerContainer: {
    marginBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  commentListContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    gap: "8px",
  },
  paper: {
    borderRadius: "8px",
    padding: "3px 8px",
  },
  newCommentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  button: {
    marginTop: "5px",
  },
}));
