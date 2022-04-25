import { useEffect, useState } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
/* import MoreHorizIcon from "@material-ui/icons/MoreHoriz"; */
import Edit from "@material-ui/icons/Edit";
import moment from "moment";
import jwtDecode from "jwt-decode";

import gamoriesImage from "../../../images/gamories.jpg";
import Likes from "./Likes";
import {
  changePostId,
  changePostData,
} from "../../../actions/currentPostAction";
import { deletePost, likePost } from "../../../actions/postsAction";
import { logout } from "../../../actions/authAction";
import { openDialog, openSnackBar } from "../../../actions/feedbackAction";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isUsersPost, setIsUsersPost] = useState(false);

  useEffect(() => {
    setIsUsersPost(
      user?.result?.googleId === post?.authorId ||
        user?.result?._id === post?.authorId
    );
  }, [post?.authorId, user]);

  const handleDelete = () => {
    dispatch(
      openDialog({
        title: "Are you sure you want to delete?",
        message: `Your gamory '${post.title}' will be deleted forever.`,
        buttonAgree: "DELETE",
        confirmAction: () => dispatch(deletePost(post._id)),
      })
    );
  };

  const handleEdit = () => {
    const token = user?.token;
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(logout());
      dispatch(openSnackBar(`Token expired. Please sign in.`));
      return;
    }

    dispatch(
      changePostData({
        title: post.title,
        description: post.description,
        tags: post.tags,
        selectedFile: post.selectedFile,
      })
    );
    dispatch(changePostId(post._id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile || gamoriesImage}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.author}</Typography>
        <Typography variant="body2">
          created {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {isUsersPost && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "inherit" }}
            size="small"
            onClick={handleEdit}
            title="Edit post"
          >
            <Edit fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags[0] !== "" && post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography className={classes.description} variant="body1">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() =>
            dispatch(likePost(post._id))
          }
        >
          <Likes post={post} />
        </Button>
        {isUsersPost && (
          <Button
            size="small"
            color="secondary"
            title="Delete post"
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" />
            &nbsp;Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
