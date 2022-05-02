import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import useStyles from "./styles";
import Post from "./Post/Post";
import Brand from "../Brand/Brand";
import { addPosts, changeHasMore } from "../../actions/postsAction";

const Posts = () => {
  const {
    isLoading,
    hasMore,
    data: posts,
  } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (currentParams.searchTerm || currentParams.tags) {
      dispatch(changeHasMore(false));
    } else {
      dispatch(changeHasMore(true));
    }
  }, [dispatch, searchParams]);

  const loadMorePosts = () => {
    dispatch(addPosts(posts[posts.length - 1]._id));
  };

  if (!posts?.length && !isLoading)
    return <Typography variant="body1">No gamories found.</Typography>;

  return isLoading ? (
    <CircularProgress style={{ display: "block", margin: "30px auto" }} />
  ) : (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={
        <CircularProgress style={{ display: "block", margin: "30px auto" }} />
      }
      endMessage={<Brand addMarginTop addOpacity />}
      style={{ overflow: "visible" }}
    >
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={8} md={8} lg={6} xl={4}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default Posts;
