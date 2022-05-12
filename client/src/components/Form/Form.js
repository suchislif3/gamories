import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Grow, TextField, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { Autocomplete, CircularProgress } from "@mui/material/";
import debounce from "lodash.debounce";
import localForage from "localforage";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/postsAction";
import { openDialog, openSnackBar } from "../../actions/feedbackAction";
import isTokenExpired from "../../utils/isTokenExpired";
import handleExpiredToken from "../../utils/handleExpiredToken";
import { fetchGamesBySearch } from "../../api";

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
    image: {
      publicId: post?.image?.publicId || "",
      url: post?.image?.url || "",
    },
  };
  const [postData, setPostData] = useState(initialPostData);
  const [isInputError, setIsInputError] = useState({
    game: false,
    title: false,
  });

  const [gameOpen, setGameOpen] = useState(false);
  const [gameOptions, setGameOptions] = useState([]);
  const [gameValue, setGameValue] = useState(
    post?.game ? { id: 0, name: post?.game } : null
  );
  const [gameInputValue, setGameInputValue] = useState(post?.game || "");
  const gameInputValueRef = useRef(gameInputValue); // define mutable ref

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(post?.image?.url || null);
  const [loading, setLoading] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);

  const isInitRender = useRef(true);

  const classes = useStyles({
    postId,
    absolutPosition,
    fixedHeight,
    withCloseButton,
    pendingRequest,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    gameInputValueRef.current = gameInputValue;
  }); // gameInputValueRef is updated after each render

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
    setGameInputValue("");
    setGameValue(null);
    setIsInputError({
      game: false,
      title: false,
    });
    setSelectedFile(null);
    setPreviewSource(null);
    setPendingRequest(false);
  };

  useEffect(() => {
    if (isInitRender.current) {
      isInitRender.current = false;
    } else {
      if (gameValue === null)
        setPostData((prevData) => ({ ...prevData, game: "" }));
      if (!gameInputValue) {
        setLoading(false);
        return;
      }
      if (gameInputValue && gameInputValue === gameValue?.name) {
        setLoading(false);
        setPostData((prevData) => ({ ...prevData, game: gameValue?.name }));
        return;
      }
      if (gameInputValue) {
        setLoading(true);
        setIsInputError((prev) => ({ ...prev, game: false }));
      }
    }
  }, [gameInputValue, gameValue]);

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    const debouncedFetch = debounce(async () => {
      const { data } = await fetchGamesBySearch(gameInputValueRef.current, 1);
      if (active) {
        setGameOptions(data);
        setLoading(false);
      }
    }, 300);
    debouncedFetch();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!gameOpen) {
      if (gameInputValue === gameValue?.name) {
        return;
      } else if (gameInputValue) {
        return;
      } else {
        if (gameOptions.length) setGameOptions([]);
      }
    }
  }, [gameInputValue, gameOpen, gameOptions.length, gameValue]);

  const isFileImage = (file) => {
    if (file?.type.split("/")[0] === "image") return true;
    return false;
  };

  const isFileSizeTooBig = (file) => {
    const maxFileSizeMb = 10;
    if (file.size / 1024 / 1024 > maxFileSizeMb) return true;
    return false;
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && isFileImage(file)) {
      if (isFileSizeTooBig(file)) {
        dispatch(openSnackBar("The maximum image file size is 10MB."));
        return;
      }
      setSelectedFile({ type: file.type, name: file.name });
      previewFile(file);
    } else if (file) {
      dispatch(openSnackBar("Please select an image to upload."));
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

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
    const base64Image = selectedFile ? previewSource : null;
    if (postId) {
      setPendingRequest(true);
      dispatch(updatePost(postId, postData, base64Image)).then(() => {
        setIsEdit(false);
        clearPostData();
      });
    } else {
      setPendingRequest(true);
      dispatch(createPost(postData, base64Image, navigate)).then(() => {
        setIsEdit(false);
        clearPostData();
      });
    }
  };

  const storePostEdit = useCallback(() => {
    localStorage.setItem(
      `postEdit_${postId || "new"}`,
      JSON.stringify({ ...postData, game: gameValue, selectedFile: "" })
    );
  }, [postData, postId, gameValue]);

  const storeFileData = useCallback(async () => {
    await localForage.setItem(`fileData_${postId || "new"}`, {
      selectedFile: selectedFile,
      previewSource: previewSource,
    });
  }, [postId, previewSource, selectedFile]);

  const storeFormData = useCallback(async () => {
    if (
      postData?.game ||
      postData.title ||
      postData.description ||
      postData.tags
    ) {
      storePostEdit();
    }
    if (selectedFile) {
      await storeFileData();
    }
  }, [
    postData.description,
    postData?.game,
    postData.tags,
    postData.title,
    selectedFile,
    storeFileData,
    storePostEdit,
  ]);

  const signInToSubmit = async () => {
    await storeFormData();
    navigate("/auth");
  };

  const loadAndRemove = useCallback(async (postId) => {
    const storedPostEdit = JSON.parse(
      localStorage.getItem(`postEdit_${postId || "new"}`)
    );
    const storedFileData = await localForage.getItem(
      `fileData_${postId || "new"}`
    );
    setPostData({
      ...storedPostEdit,
      game: storedPostEdit?.game?.name,
    });
    if (storedFileData) {
      setSelectedFile(storedFileData.selectedFile);
      setPreviewSource(storedFileData.previewSource);
    }
    setGameValue(storedPostEdit?.game);
    setGameInputValue(storedPostEdit?.game?.name);
    localStorage.removeItem(`postEdit_${postId ? postId : "new"}`);
    await localForage.removeItem(`fileData_${postId || "new"}`);
  }, []);

  const handleClose = async () => {
    await storeFormData();
    setIsEdit(false);
  };

  useEffect(() => {
    async function isPostDataStored() {
      if (
        localStorage.getItem(`postEdit_${postId || "new"}`) ||
        (await localForage.getItem(`fileData_${postId || "new"}`))
      ) {
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
    }
    isPostDataStored();
  }, [dispatch, loadAndRemove, postId]);

  return (
    <Grow in>
      <Card className={classes.card} raised elevation={6}>
        {pendingRequest ? (
          <CircularProgress size={"4em"} />
        ) : (
          <>
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
                value={gameValue}
                onChange={(event, newValue) => {
                  setGameValue(newValue);
                }}
                inputValue={gameInputValue}
                onInputChange={(event, newInputValue) => {
                  setGameInputValue(newInputValue);
                }}
                options={gameOptions}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                open={gameOpen}
                onOpen={() => {
                  setGameOpen(true);
                }}
                onClose={() => {
                  setGameOpen(false);
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
                maxRows={3}
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
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value })
                }
              />
              <div className={classes.fileInput}>
                <input
                  type="file"
                  id="file-select"
                  name="file-select"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <Button
                  type={"button"}
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => document.getElementById("file-select").click()}
                >
                  Upload image
                </Button>
                {previewSource ? (
                  <>
                    {selectedFile && <DoneIcon />}
                    <img
                      src={previewSource}
                      alt="chosen"
                      style={{ height: "30px" }}
                    />
                  </>
                ) : (
                  <Typography variant="caption">(max.10MB)</Typography>
                )}
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
                onClick={
                  postId ? () => setIsEdit(false) : () => clearPostData()
                }
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
          </>
        )}
      </Card>
    </Grow>
  );
};

export default Form;
