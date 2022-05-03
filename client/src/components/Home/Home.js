import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Grow,
  Grid,
  TextField,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import {
  getPosts,
  addPosts,
  getPostsBySearch,
} from "../../actions/postsAction";
import { openSnackBar } from "../../actions/feedbackAction";
import { START_LOADING } from "../../actions/actionTypes";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [chipInputValue, setChipInputValue] = useState("");
  const [isChipError, setIsChipError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [tags, setTags] = useState(
    searchParams.get("tags") ? searchParams.get("tags").split(",") : []
  );
  const { hasMore, data: posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts.length > 0 && hasMore) {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      console.log(window.innerHeight, scrollHeight)
      if (window.innerHeight >= scrollHeight) {
        dispatch(addPosts(posts[posts.length - 1]._id));
      }
    }
  }, [posts, hasMore, dispatch]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (!currentParams.searchTerm && !currentParams.tags) {
      dispatch(getPosts());
    } else {
      dispatch(
        getPostsBySearch({
          searchTerm: currentParams.searchTerm,
          tags: currentParams.tags,
        })
      );
    }
    return () => {
      dispatch({ type: START_LOADING });
    };
  }, [dispatch, searchParams]);

  const searchPost = () => {
    if (searchTerm === "" && tags.length === 0) {
      navigate("/posts");
    } else {
      navigate(
        `/posts/search?searchTerm=${searchTerm || ""}&tags=${tags.join(",")}`
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (tags.length === 0 && chipInputValue !== "") {
        setIsChipError(true);
        dispatch(
          openSnackBar(
            "Please complete the tag to search by pressing [space] or [,]."
          )
        );
        return;
      }
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
    setChipInputValue("");
    setIsChipError(false);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    setIsChipError(false);
  };

  const handleUpdateInput = (e) => {
    setChipInputValue(e.target.value);
    setIsChipError(false);
  };

  return (
    <Grow in>
      <Container maxWidth={"xl"}>
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={8} md={4} lg={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
              elevation={6}
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search in Gamories"
                onKeyDown={handleKeyDown}
                fullWidth
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <ChipInput
                className={classes.chipInput}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search by Tags"
                onKeyDown={handleKeyDown}
                variant="outlined"
                newChipKeyCodes={[32, 188]}
                newChipKeys={[" ", ","]}
                inputValue={chipInputValue}
                onUpdateInput={handleUpdateInput}
                error={isChipError}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form isEdit />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
