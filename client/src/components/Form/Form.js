import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Grow, TextField, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/postsAction";
import { openDialog } from "../../actions/feedbackAction";
import isTokenExpired from "../../utils/isTokenExpired";
import handleExpiredToken from "../../utils/handleExpiredToken";

const Form = ({
  post,
  setIsEdit,
  absolutPosition,
  fixedHeight,
  withCloseButton,
}) => {
  const user = useSelector((state) => state.user);
  const [postId] = useState(post?._id || null);
  const initialPostData = {
    title: post?.title || "",
    description: post?.description || "",
    tags: post?.tags || "",
    selectedFile: post?.selectedFile || "",
  };
  const [postData, setPostData] = useState(initialPostData);
  const [isInputError, setIsInputError] = useState(false);
  const classes = useStyles({ postId, absolutPosition, fixedHeight, withCloseButton });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearPostData = () => {
    setPostData(initialPostData);
    setIsInputError(false);
    localStorage.removeItem("postEdit_new");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.title) {
      setIsInputError(true);
      return;
    }
    if (isTokenExpired(user)) {
      handleExpiredToken();
      signInToSubmit();
      return;
    }
    if (postId) {
      dispatch(updatePost(postId, postData));
      setIsEdit(false);
    } else {
      dispatch(createPost(postData, navigate));
    }
    clearPostData();
  };

  const storeFormData = useCallback(() => {
    if (postData.title || postData.description || postData.tags) {
      localStorage.setItem(
        `postEdit_${postId || "new"}`,
        JSON.stringify({ ...postData, selectedFile: "" })
      );
    }
  }, [postData, postId]);

  const signInToSubmit = () => {
    storeFormData();
    navigate("/auth");
  };

  const loadAndRemove = useCallback(
    (postId) => {
      setPostData({
        ...JSON.parse(
          localStorage.getItem(`postEdit_${postId ? postId : "new"}`)
        ),
        selectedFile: post?.selectedFile,
      });
      localStorage.removeItem(`postEdit_${postId ? postId : "new"}`);
    },
    [post?.selectedFile]
  );

  const handleClose = () => {
    storeFormData();
    setIsEdit(false);
  };

  useEffect(() => {
    if (localStorage.getItem(`postEdit_${postId ? postId : "new"}`)) {
      if (postId) {
        dispatch(
          openDialog({
            title: "Do you want to load your previous edit?",
            message: "If not, it will be deleted.",
            buttonAgree: "YES",
            buttonDisagree: "NO",
            confirmAction: () => loadAndRemove(postId),
          })
        );
      } else {
        loadAndRemove();
      }
    }
  }, [dispatch, loadAndRemove, postId]);

  return (
    <Grow in>
      <Card className={classes.card} raised elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {postId ? "Edit" : "Share"} your gamory
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => {
              setIsInputError(false);
              setPostData({ ...postData, title: e.target.value });
            }}
            required
            error={isInputError}
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            value={postData.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (comma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            type={user ? "submit" : "button"}
            variant="contained"
            className={classes.buttonSubmit}
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              if (!user) signInToSubmit();
            }}
          >
            {user ? (postId ? "Save" : "Submit") : "Sign in to submit"}
          </Button>
          <Button
            onClick={postId ? () => setIsEdit(false) : () => clearPostData()}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
          >
            {postId ? "Cancel" : "Clear"}
          </Button>
        </form>
        {withCloseButton && (
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        )}
      </Card>
    </Grow>
  );
};

export default Form;
