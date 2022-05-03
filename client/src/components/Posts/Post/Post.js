import { useState } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";

import jwtDecode from "jwt-decode";
import { Container } from "@material-ui/core";
import { logout } from "../../../actions/authAction";
import { openSnackBar } from "../../../actions/feedbackAction";
import Gamory from "./Gamory/Gamory";
import Form from "../../Form/Form";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    const token = user?.token;
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(logout());
      dispatch(openSnackBar(`Token expired. Please sign in.`));
      return;
    }
    setIsEdit(true);
  };

  return (
    <Container className={classes.postContainer}>
      {isEdit && <Form post={post} isEdit={isEdit} setIsEdit={setIsEdit} /> }
      <Gamory post={post} handleEdit={handleEdit} isEdit={isEdit} />
    </Container>
  );
};

export default Post;
