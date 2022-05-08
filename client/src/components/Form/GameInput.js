import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete, CircularProgress } from "@mui/material/";

import { fetchGames } from "../../api";

const GameInput = ({ setGame, isInputError, setGameIsInputError }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue) setGameIsInputError(false)
    if (inputValue === value?.name) setGame(value?.name)
    if (value == null) setGame("")
    if (!inputValue) setLoading(false)
  }, [inputValue, setGame, setGameIsInputError, value]);

  useEffect(() => {
    console.log("VALUE OBJECT: ", value);
    console.log("INPUT VALUE: ", inputValue);
  }, [value, inputValue]);

  useEffect(() => {
    let active = true;
    
    if (inputValue) {
      console.log("FETCHING");
      (async () => {
        setLoading(true)
        const { data } = await fetchGames(inputValue, 1);
        console.log(data);
        if (!data.length) {
          setLoading(false);
          return undefined;
        }
        console.log("LEMENT A FETCH")
        if (active) {
          console.log("aktiv true")
          setOptions(data);
          console.log("setLoading false")
          setLoading(false);
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [inputValue, loading]);

  useEffect(() => {
    if (!open) {
      if (inputValue === value?.name) {
        return;
      } else {
        setOptions([]);
      }
    }
  }, [inputValue, open, value]);

  return (
    <Autocomplete
      id="game"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setLoading(false);
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
          <li {...props} key={option.id}>
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
          error={isInputError}
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
  );
};

export default GameInput;
