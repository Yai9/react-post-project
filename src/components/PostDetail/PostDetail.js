import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner.js";
import "./PostDetail.css";

const PostDetail = (props) => {
  let postItem = JSON.parse(localStorage.getItem("postData")).find(
    (i) => i.id === props.match.params.id
  );

  const [postDetail, setDetail] = useState(postItem);
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  let postComments = JSON.parse(localStorage.getItem("comments"));

  const editModeHandler = () => {
    return (window.location.pathname = `/edit/${props.match.params.id}`);
  };

  const showCommentsHandler = () => {
    setShowComments(!showComments);
  };

  const addNewCommentHandler = () => {
    const addedComment = {
      id: Math.random().toString(),
      message: newComment,
      owner: {
        id: Math.random().toString(),
        firstName: "You",
        lastName: "",
      },
      post: props.match.params.id,
      publishDate: new Date().toLocaleString(),
    };
    if (postComments) {
      localStorage.setItem(
        "comments",
        JSON.stringify(postComments.concat(addedComment))
      );
    } else {
      localStorage.setItem("comments", JSON.stringify([].concat(addedComment)));
    }
    setNewComment("");
    setShowComments(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const commentsData = await fetch(
        `https://dummyapi.io/data/v1/post/${props.match.params.id}/comment?limit=10`,
        {
          headers: {
            "app-id": "616dd2a1aabb17f7eeb7ff58",
          },
        }
      );

      const comments = await commentsData.json();

      let commentHasPostId;
      if (postComments && postComments.length !== 0) {
        commentHasPostId = postComments.filter(
          (p) => p.post === props.match.params.id
        );
      }
      if (postComments) {
        setComments(comments.data.concat(...commentHasPostId));
      } else {
        setComments(comments.data);
      }
    };

    fetchData();
  }, [showComments]);

  return (
    <Fragment>
      {postDetail ? (
        <div key={postDetail.id} className="detailed_post">
          <div className="detailed_post_owner">
            <img
              className="profile_image"
              src={postDetail.owner.picture}
              alt={postDetail.owner.firstName}
            />
            <h4>
              {postDetail.owner.firstName + " "}
              {postDetail.owner.lastName}
            </h4>
            <span className="post_date">{postDetail.publishDate}</span>
          </div>
          <div className="detailed_post_title">
            <h2>{postDetail.text}</h2>
          </div>
          <div className="detailed_post_image">
            <img
              className="post_image"
              src={postDetail.image}
              alt={postDetail.title}
            />
          </div>
          <div className="detailed_post_footer">
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>{postDetail.likes}</span>{" "}
                likes
              </p>
              <div className="post_tags">
                {postDetail.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </div>
            </div>

            {comments ? (
              <div className="post_comments">
                {comments.length == 0 ? (
                  <div>
                    <p>No comments for this post.</p>
                    <input
                      type="text"
                      placeholder="Add new comment..."
                      onChange={(event) => setNewComment(event.target.value)}
                    />
                    <button
                      className="detailed_post_button"
                      onClick={addNewCommentHandler}
                    >
                      Add New Comment
                    </button>
                  </div>
                ) : (
                  <div>
                    <p
                      onClick={showCommentsHandler}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      {!showComments ? "Show" : "Hide"} comments
                    </p>
                    {showComments ? (
                      <div className="post_comment_section">
                        {comments.map((comment) => (
                          <li key={comment.id}>
                            <span style={{ fontWeight: "bold" }}>
                              {comment.owner.firstName +
                                " " +
                                comment.owner.lastName +
                                " "}
                            </span>
                            <p>{comment.message}</p>
                          </li>
                        ))}
                        <div>
                          <input
                            type="text"
                            placeholder="Add new comment..."
                            onChange={(event) =>
                              setNewComment(event.target.value)
                            }
                          />
                          <button
                            className="detailed_post_button"
                            onClick={addNewCommentHandler}
                          >
                            Add New Comment
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
          <Link className="detailed_post_link" to="/">
            Back
          </Link>
          <button className="detailed_post_button" onClick={editModeHandler}>
            Edit Post
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default PostDetail;
