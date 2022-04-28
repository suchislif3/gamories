import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  const [page, setPage] = useState(1);

  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  /* window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("most");
      fetchMorePosts();
    }
  }; */
  
  useEffect(() => {
    console.log("PAGE", page);
    if (page !== 1) {
      dispatch(addPosts(page));
      console.log("ADD POSTS USE EFFECT");
    }
  }, [dispatch, page]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log("INITIAL USE EFFECT");
    if (!currentParams.searchTerm && !currentParams.tags) {
      setPage(1);
      dispatch(getPosts());
    } else {
      dispatch(
        getPostsBySearch({
          searchTerm: currentParams.searchTerm,
          tags: currentParams.tags,
        })
      );
    }
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
            <Posts fetchData={fetchMorePosts} currentParams={Object.fromEntries([...searchParams])} />
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
