import { memo, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post/Post";
import Brand from "../Brand/Brand";
import {
  getPosts,
  addPosts,
  getPostsBySearch,
  changeHasMore,
  startLoading,
} from "../../actions/postsAction";

const Posts = () => {
  const {
    isLoading,
    hasMore,
    data: posts,
  } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const hasMoreRef = useRef(hasMore);
  
  useEffect(() => {
    hasMoreRef.current = hasMore;
  });

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (currentParams.searchTerm || currentParams.tags) {
      if (hasMoreRef.current) dispatch(changeHasMore(false));
      dispatch(
        getPostsBySearch({
          searchTerm: currentParams.searchTerm,
          tags: currentParams.tags,
        })
      );
    } else {
      if (!hasMoreRef.current) dispatch(changeHasMore(true));
      dispatch(getPosts());
    }
    return () => {
      dispatch(startLoading);
    };
  }, [dispatch, searchParams]);

  const loadMorePosts = useCallback(() => {
    dispatch(addPosts(posts[posts.length - 1]._id));
  }, [dispatch, posts]);

  useEffect(() => {
    if (!isLoading && posts.length > 0 && hasMore) {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      if (window.innerHeight >= scrollHeight) {
        loadMorePosts();
      }
    }
  }, [isLoading, posts, hasMore, loadMorePosts]);

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
      endMessage={<Brand addMarginTop addPaddingBottom addOpacity centered />}
      style={{ overflow: "visible" }}
    >
      <Grid
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default memo(Posts);
