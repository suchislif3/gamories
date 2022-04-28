import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post/Post";
import useStyles from "./styles";
import Brand from "../Brand/Brand";
import { useEffect, useState } from "react";

const Posts = ({ fetchData, currentParams }) => {
  const {
    isLoading,
    data: posts,
    pagesTotal,
    currentPage,
  } = useSelector((state) => state.posts);
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    console.log(currentParams.searchTerm);
    if (currentParams.searchTerm || currentParams.tags) {
      setHasMore(false);
    } else {
      setHasMore(currentPage < pagesTotal);
    }
  }, [currentPage, currentParams.searchTerm, currentParams.tags, pagesTotal]);

  if (!posts?.length && !isLoading)
    return <Typography variant="body1">No gamories found.</Typography>;

  return isLoading ? (
    <CircularProgress style={{ display: "block", margin: "30px auto" }} />
  ) : (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchData}
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
