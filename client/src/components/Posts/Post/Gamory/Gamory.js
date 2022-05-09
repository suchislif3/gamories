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
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Edit from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SportsEsportsOutlinedIcon from "@material-ui/icons/SportsEsportsOutlined";
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles({ isEdit });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <>
          <div className={classes.overlay2}>
            <Button
              aria-controls="author-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="author-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                title="Edit post"
                onClick={() => {
                  handleEdit(user, setIsEdit);
                  handleClose();
                }}
              >
                <Edit style={{ color: "inherit" }} fontSize="medium" />
                &nbsp;Edit
              </MenuItem>
              <MenuItem
                title="Delete post"
                className={classes.deleteIcon}
                onClick={() => {
                  handleDelete(post);
                  handleClose();
                }}
              >
                <DeleteIcon fontSize="small" />
                &nbsp;Delete
              </MenuItem>
            </Menu>
          </div>
        </>
      )}
      <CardContent className={classes.container}>
        <div className={classes.details}>
          <div className={classes.gameContainer}>
            <SportsEsportsOutlinedIcon />
            <Typography variant="subtitle1">{post?.game}</Typography>
          </div>
          <Typography variant="body2">
            {post.tags[0] !== "" &&
              post.tags.map((tag, i) => (
                <span key={i}>
                  <Link key={i} to={`/posts/search?searchTerm=&tags=${tag}`}>
                    #{tag}
                  </Link>{" "}
                </span>
              ))}
          </Typography>
          <Divider />
        </div>
        <div className={classes.content}>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography className={classes.description} variant="body1">
            {post.description}
          </Typography>
        </div>
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
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/posts/${post._id}/#comments`)}
        >
          <ChatBubbleOutlineIcon />
          &nbsp;
          <Typography variant="body1">{post.comments.length || ""}</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Gamory;
