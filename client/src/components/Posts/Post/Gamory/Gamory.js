import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import moment from "moment";

import useStyles from "./styles";
import Likes from "../../Likes/Likes";
import { likePost } from "../../../../actions/postsAction";
import handleEdit from "../../../../utils/handleEdit";
import handleDelete from "../../../../utils/handleDelete";
import gamoriesBrand from "../../../../images/gamories_brand.png";
import gamoriesBrandDark from "../../../../images/gamories_brand_dark.png";

const Gamory = ({ post, isEdit, setIsEdit }) => {
  const [isUsersPost, setIsUsersPost] = useState(false);
  const { user, isDark } = useSelector((state) => state);
  const classes = useStyles({ isEdit });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsUsersPost(
      user?.result?.googleId === post?.authorId ||
        user?.result?._id === post?.authorId
    );
  }, [post?.authorId, user]);

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile || (isDark ? gamoriesBrandDark : gamoriesBrand)
        }
        title={post.title}
        onClick={openPost}
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
            onClick={() => handleEdit(user, setIsEdit)}
            title="Edit post"
          >
            <Edit fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags[0] !== "" &&
            post.tags.map((tag, i) => (
              <span key={i}>
                <Link key={i} to={`/posts/search?searchTerm=&tags=${tag}`}>
                  #{tag}
                </Link>{" "}
              </span>
            ))}
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
          variant="contained"
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes post={post} />
        </Button>
        {isUsersPost && (
          <Button
            size="small"
            color="secondary"
            title="Delete post"
            onClick={() => handleDelete(post)}
          >
            <DeleteIcon fontSize="small" />
            &nbsp;Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Gamory;
