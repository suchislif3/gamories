import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";

import { getPosts } from "../../actions/postsAction";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  const currentPostId = useSelector((state) => state.currentPost.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentPostId]);

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
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
