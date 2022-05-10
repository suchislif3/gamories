import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppBar, Button, TextField } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";
import { openSnackBar } from "../../actions/feedbackAction";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const [chipInputValue, setChipInputValue] = useState("");
  const [isChipError, setIsChipError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [tags, setTags] = useState(
    searchParams.get("tags") ? searchParams.get("tags").split(",") : []
  );

  const searchPost = () => {
    if (searchTerm === "" && tags.length === 0) {
      navigate("/posts");
    } else {
      navigate(
        `/posts/search?searchTerm=${searchTerm || ""}&tags=${tags.join(",")}`
      );
    }
  };

  const setTagsBySearchParams = useCallback(() => {
    if (searchParams.get("tags")) setTags(searchParams.get("tags").split(","));
  }, [searchParams]);

  const setTermsBySearchParams = useCallback(
    () => setSearchTerm(searchParams.get("searchTerm") || ""),
    [searchParams]
  );

  useEffect(() => {
    setTermsBySearchParams();
    setTagsBySearchParams();
  }, [setTagsBySearchParams, setTermsBySearchParams]);

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
      <Button onClick={searchPost} variant="outlined" color="primary">
        Search
      </Button>
    </AppBar>
  );
};

export default Search;
