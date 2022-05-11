import React, { useState } from "react";
import { Button, Container, Grid } from "@material-ui/core";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import Search from "../Search/Search";

const Home = () => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Container className={classes.container} maxWidth={"xl"}>
      <Grid
        className={classes.gridContainer}
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <Posts />
        </Grid>
        <Grid item xs={12} sm={8} md={4} lg={3}>
          <Search />
          {isEdit ? (
            <Form fixedHeight withCloseButton setIsEdit={setIsEdit} />
          ) : (
            <Button
              fullWidth
              size="large"
              onClick={() => setIsEdit(true)}
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Share your gamory
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
