import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/postsAction";

const Form = ({ post, setIsEdit }) => {
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
  const classes = useStyles({ postId });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearPostData = () => {
    setPostData(initialPostData);
    setIsInputError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.title) {
      setIsInputError(true);
      return;
    }
    if (postId) {
      dispatch(updatePost(postId, postData));
      setIsEdit(false);
    } else {
      dispatch(createPost(postData));
    }
    clearPostData();
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {postId ? "Edit" : "Share"} your Gamory
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
            if (!user) navigate("/auth");
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
    </Card>
  );
};

export default Form;
