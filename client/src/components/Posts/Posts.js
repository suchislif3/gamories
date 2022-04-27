import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const { isLoading, posts } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts?.length && !isLoading) return <Typography variant="body1" >No gamories found.</Typography>;

  return isLoading ? (
    <CircularProgress />
  ) : (
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
  );
};

export default Posts;
