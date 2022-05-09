import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Grow, TextField, Typography } from "@material-ui/core";
import { Autocomplete, CircularProgress } from "@mui/material/";
import FileBase from "react-file-base64";
import debounce from "lodash.debounce";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/postsAction";
import { openDialog } from "../../actions/feedbackAction";
import isTokenExpired from "../../utils/isTokenExpired";
import handleExpiredToken from "../../utils/handleExpiredToken";
import { fetchGames } from "../../api";

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
    game: post?.game || "",
    title: post?.title || "",
    description: post?.description || "",
    tags: post?.tags || "",
    selectedFile: post?.selectedFile || "",
  };
  const [postData, setPostData] = useState(initialPostData);
  const [isInputError, setIsInputError] = useState({
    game: false,
    title: false,
  });

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const [value, setValue] = useState(
    post?.game ? { id: 0, name: post?.game } : null
  );
  const [inputValue, setInputValue] = useState(post?.game || "");
  const inputValueRef = useRef(inputValue); // define mutable ref
  useEffect(() => {
    inputValueRef.current = inputValue;
  }); // inputValueRef is updated after each render

  const [loading, setLoading] = useState(false);

  const classes = useStyles({
    postId,
    absolutPosition,
    fixedHeight,
    withCloseButton,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    if (isInputError.hasOwnProperty(e.target.name))
      setIsInputError((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const clearPostData = () => {
    setPostData(initialPostData);
    setInputValue("");
    setValue(null);
    setIsInputError({
      game: false,
      title: false,
    });
    localStorage.removeItem("postEdit_new");
  };

  useEffect(() => {
    if (value === null) setPostData((prevData) => ({ ...prevData, game: "" }));
    if (!inputValue) {
      setLoading(false);
      return;
    }
    if (inputValue && inputValue === value?.name) {
      setLoading(false);
      setPostData((prevData) => ({ ...prevData, game: value?.name }));
      return;
    }
    if (inputValue) {
      setLoading(true);
      setIsInputError((prev) => ({ ...prev, game: false }));
    }
  }, [inputValue, value]);

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    const debouncedFetch = debounce(async () => {
      const { data } = await fetchGames(inputValueRef.current, 1);
      if (active) {
        setOptions(data);
        setLoading(false);
      }
    }, 300);
    debouncedFetch();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      if (inputValue === value?.name) {
        return;
      } else if (inputValue) {
        return;
      } else {
        setOptions([]);
      }
    }
  }, [inputValue, open, value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.game) {
      setIsInputError((prevData) => ({ ...prevData, game: true }));
      return;
    }
    if (!postData.title) {
      setIsInputError((prevData) => ({ ...prevData, title: true }));
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
    if (
      postData?.game ||
      postData.title ||
      postData.description ||
      postData.tags
    ) {
      localStorage.setItem(
        `postEdit_${postId || "new"}`,
        JSON.stringify({ ...postData, game: value, selectedFile: "" })
      );
    }
  }, [postData, postId, value]);

  const signInToSubmit = () => {
    storeFormData();
    navigate("/auth");
  };

  const loadAndRemove = useCallback(
    (postId) => {
      const storedFormData = JSON.parse(
        localStorage.getItem(`postEdit_${postId ? postId : "new"}`)
      );
      setPostData({
        ...storedFormData,
        game: storedFormData?.game?.name,
        selectedFile: post?.selectedFile,
      });
      setValue(storedFormData?.game);
      setInputValue(storedFormData?.game?.name);
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
          <Autocomplete
            id="game"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={options}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            loading={loading}
            fullWidth
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id} title={option?.storyline}>
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="game"
                required
                label="Game"
                variant="outlined"
                error={isInputError.game}
                placeholder="type to search..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={handleChange}
            required
            error={isInputError.title}
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
