import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";

import { getPosts } from "../../actions/postsAction";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item sm={12} md={8}>
            <Posts />
          </Grid>
          <Grid item sm={6} md={4}>
            <Form isEdit />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
