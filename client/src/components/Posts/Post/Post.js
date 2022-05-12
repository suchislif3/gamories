import { useState, memo } from "react";
import { Container } from "@material-ui/core";

import useStyles from "./styles";
import Gamory from "./Gamory/Gamory";
import Form from "../../Form/Form";

const Post = ({ post }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Container className={classes.postContainer}>
      {isEdit ? (
        <Form post={post} setIsEdit={setIsEdit} absolutPosition />
      ) : (
        <Gamory post={post} isEdit={isEdit} setIsEdit={setIsEdit} />
      )}
    </Container>
  );
};

export default memo(Post);
