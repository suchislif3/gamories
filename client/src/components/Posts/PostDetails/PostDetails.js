import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Button,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import moment from "moment";

import useStyles from "./styles";
import { getPost, likePost } from "../../../actions/postsAction";
import { START_LOADING } from "../../../actions/actionTypes";
import Likes from "../Likes/Likes";
import Form from "../../Form/Form";
import handleEdit from "../../../utils/handleEdit";
import handleDelete from "../../../utils/handleDelete";
import gamoriesBrand from "../../../images/gamories_brand.png";
import gamoriesBrandDark from "../../../images/gamories_brand_dark.png";

const PostDetails = () => {
  const { postById: post, isLoading } = useSelector((state) => state.posts);
  const { user, isDark } = useSelector((state) => state);
  const [isUsersPost, setIsUsersPost] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    setIsUsersPost(
      user?.result?.googleId === post?.authorId ||
        user?.result?._id === post?.authorId
    );
  }, [post?.authorId, user]);

  useEffect(() => {
    dispatch(getPost(id, navigate));
    return () => {
      dispatch({ type: START_LOADING });
    };
  }, [dispatch, id, navigate]);

  if (!post) return null;

  return isLoading ? (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
  ) : isEdit ? (
    <Form post={post} setIsEdit={setIsEdit} fixedHeight />
  ) : (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.section}>
        <div className={classes.topSection}>
          <Typography variant="h4">{post?.title}</Typography>
          <div className={classes.subSection}>
            <Typography variant="h6">Created by: {post?.author}</Typography>
            <Typography variant="body2">
              {moment(post?.createdAt).fromNow()}
            </Typography>
          </div>
        </div>
        <Divider style={{ margin: "20px 0 0" }} />
      </div>
      <div className={classes.card}>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post?.selectedFile || (isDark ? gamoriesBrandDark : gamoriesBrand)
            }
            alt={post?.title}
          />
        </div>
        <div className={classes.section}>
          <div className={classes.subSection}>
            <Typography gutterBottom variant="h6" color="textSecondary">
              {post?.tags[0] !== "" &&
                post?.tags.map((tag, i) => (
                  <span key={i}>
                    <Link key={i} to={`/posts/search?searchTerm=&tags=${tag}`}>
                      #{tag}
                    </Link>{" "}
                  </span>
                ))}
            </Typography>
          </div>
          <div className={classes.subSection}>
            <Typography gutterBottom variant="body1">
              {post?.description}
            </Typography>
          </div>
          <div className={classes.subSection}>
            <Divider style={{ margin: "20px 0 10px 0" }} />
            <div className={classes.cardActions}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => dispatch(likePost(post?._id))}
              >
                <Likes post={post} />
              </Button>
              {isUsersPost && (
                <Button
                  size="small"
                  color="secondary"
                  title="Delete post"
                  onClick={() => handleDelete(post, () => navigate("/posts"))}
                >
                  <DeleteIcon fontSize="small" />
                  &nbsp;Delete
                </Button>
              )}
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
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default PostDetails;
