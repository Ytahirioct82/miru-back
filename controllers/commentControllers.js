const express = require("express");

const { getActivityComments, addComment, updateComment, deleteComment } = require("../queries/comments");

const comments = express.Router({ mergeParams: true });
const requiresLogin = (req, res, next) => {
  if (req.user) return next();

  res.sendStatus(401);
};

comments.get("/", async (req, res) => {
  // const currentUser = req.user && req.user;
  const comments = await getActivityComments(req.params.id);
  // const commentsWithUser = comments.map((comment) => {
  //   return { ...comment, currentUser };
  // });

  res.status(200).json(comments);
});

comments.post("/", requiresLogin, async (req, res) => {
  const user_id = req.user.id;
  const activity_id = req.params.id;
  const { name } = req.user;

  const addedComments = await addComment({ ...req.body, user_id, activity_id, name });

  if (addedComments) {
    const allComments = await getActivityComments(req.params.id);

    res.status(200).json(allComments);
  } else {
    res.status(404).json({ error: `comment could not be added` });
  }
});

comments.put("/:id", requiresLogin, async (req, res) => {
  const { user_id, activity_id } = req.body;
  const { id } = req.user;
  const commentId = req.params.id;

  if (user_id !== id || req.body.comment === "") {
    res.status(401).json({ error: `unauthorized action` });
  } else {
    const updatedComment = await updateComment(commentId, req.body);

    if (updatedComment) {
      const allComments = await getActivityComments(activity_id);

      res.status(200).json(allComments);
    } else {
      res.status(404).json({ error: `comment with id of ${req.params.id} could not be edited` });
    }
  }
});

comments.delete("/:commentId", requiresLogin, async (req, res) => {
  const current_user = req.user.id;
  const { commentId } = req.params;
  const activity_id = req.params.id;
  const { commentUser } = req.query;

  if (current_user != commentUser) {
    res.status(401).json({ error: `unauthorized action` });
  } else {
    const deletedComment = await deleteComment(commentId);
    if (deletedComment) {
      const comments = await getActivityComments(activity_id);

      res.status(200).json(comments);
    } else {
      res.status(404).json({ error: `review with id of ${id} could not be deleted` });
    }
  }
});
module.exports = comments;
