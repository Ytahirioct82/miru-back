const db = require("../db/dbConfig");

const getActivityComments = async (id) => {
  try {
    const comments = await db.any("SELECT * FROM comments WHERE activity_id = $1", id);
    return comments;
  } catch (error) {
    throw error;
  }
};

const addComment = async (userComment) => {
  const { comment, user_id, activity_id, name } = userComment;
  try {
    addedComment = await db.any(
      "INSERT INTO comments (user_id, activity_id,name,comment) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_id, activity_id, name, comment]
    );

    return addedComment;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (id, comments) => {
  const { activity_id, name, comment } = comments;
  try {
    const updatedComment = await db.one(
      "UPDATE comments SET name=$1,comment=$2,activity_id=$3 WHERE id=$4 RETURNING *",
      [name, comment, activity_id, id]
    );
    return updatedComment;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (id) => {
  try {
    const comment = await db.one("DELETE FROM comments WHERE id=$1 RETURNING *", id);

    return comment;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getActivityComments,
  addComment,
  updateComment,
  deleteComment,
};
