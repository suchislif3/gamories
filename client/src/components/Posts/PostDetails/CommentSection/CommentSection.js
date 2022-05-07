import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Grid,
  Grow,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";

import useStyles from "./styles";
import { commentPost } from "../../../../actions/postsAction";
import isTokenExpired from "../../../../utils/isTokenExpired";
import handleExpiredToken from "../../../../utils/handleExpiredToken";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { comments: commentsData } = useSelector(
    (state) => state.posts.postById
  );
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [isInputError, setIsInputError] = useState(false);

  const itemKey = `pendingComment_${post._id}`;

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  const storeComment = useCallback(() => {
    localStorage.setItem(itemKey, comment);
  }, [comment, itemKey]);

  const signInToSubmit = () => {
    if (comment) storeComment();
    navigate("/auth");
  };

  const loadAndRemove = useCallback(() => {
    setComment(localStorage.getItem(itemKey));
    localStorage.removeItem(itemKey);
  }, [itemKey]);

  useEffect(() => {
    if (localStorage.getItem(itemKey)) {
      loadAndRemove();
    }
  }, [itemKey, loadAndRemove]);

  const handleClick = () => {
    if (!user) {
      signInToSubmit();
      return;
    }
    if (!comment) {
      setIsInputError(true);
      return;
    }
    if (isTokenExpired(user)) {
      handleExpiredToken();
      signInToSubmit();
      return;
    }
    dispatch(commentPost(post._id, comment)).then((res) => {
      if (res === "success") setComment("");
    });
  };

  const handleChange = (e) => {
    setIsInputError(false);
    setComment(e.target.value);
  };

  return (
    <Grid
      id="comments"
      container
      className={classes.outerContainer}
      spacing={4}
    >
      <Grid item className={classes.commentsContainer} xs={12} sm={12} md={7}>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        <div className={classes.commentListContainer}>
          {commentsData.length ? (
            commentsData.map((commentData, i) => (
              <Grow key={i} in>
                <Paper className={classes.paper} elevation={2}>
                  <Typography variant="caption">
                    {moment(commentData.createdAt).fromNow()}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={2}>
                      <Typography gutterBottom variant="body2" color="primary">
                        <strong>{commentData.author}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                      <Typography gutterBottom variant="body2">
                        {commentData.comment}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grow>
            ))
          ) : (
            <Paper className={classes.paper} elevation={2}>
              <Typography gutterBottom variant="body2">
                No comments yet.
              </Typography>
            </Paper>
          )}
        </div>
      </Grid>
      <Grid item className={classes.newCommentContainer} xs={12} sm={12} md={5}>
        <Typography gutterBottom variant="h6">
          Write a comment
        </Typography>
        <TextField
          required
          fullWidth
          minRows={2}
          maxRows={6}
          variant="outlined"
          label="Comment"
          multiline
          value={comment}
          onChange={handleChange}
          error={isInputError}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClick}
        >
          {`${!user ? "Sign in to c" : "C"}omment`}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CommentSection;
