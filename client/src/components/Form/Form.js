import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/postsAction";
import { changePostData, changePostInputError, clearCurrentPost } from "../../actions/currentPostAction";

const Form = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const postId = useSelector((state) => state.currentPost.id);
  const postData = useSelector((state) => state.currentPost.data);
  const inputError = useSelector((state) => state.currentPost.inputError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.title) {
      dispatch(changePostInputError(true));
      return;
    }
    postId
      ? dispatch(updatePost(postId, postData))
      : dispatch(createPost(postData));
    dispatch(clearCurrentPost());
  };

  return (
    <Paper className={classes.paper}>
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
            dispatch(changePostInputError(false));
            dispatch(changePostData({ ...postData, title: e.target.value }));
          }}
          required
          error={inputError}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          minRows={2}
          maxRows={5}
          value={postData.description}
          onChange={(e) =>
            dispatch(
              changePostData({ ...postData, description: e.target.value })
            )
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            dispatch(changePostData({ ...postData, tags: e.target.value }));
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              dispatch(changePostData({ ...postData, selectedFile: base64 }))
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
          {user ? "Submit" : "Sign in to submit"}
        </Button>
        <Button
          onClick={() => dispatch(clearCurrentPost())}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
