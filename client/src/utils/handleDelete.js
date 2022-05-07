import store from "../store/store";
import { openDialog } from "../actions/feedbackAction";
import { deletePost } from "../actions/postsAction";

  const handleDelete = (post, callbackAfterDelete) => {
    store.dispatch(
      openDialog({
        title: "Are you sure you want to delete?",
        message: `Your gamory '${post.title}' will be deleted forever.`,
        buttonAgree: "DELETE",
        confirmAction: () =>
          store.dispatch(deletePost(post._id)).then(callbackAfterDelete),
      })
    );
  };

  export default handleDelete;
