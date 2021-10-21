import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = (props) => {
  return (
    <Fragment>
      <div key={props.id} className="single-post">
        <div className="single-post-owner">
          <img
            className="profile-image"
            src={props.owner.picture}
            alt={props.owner.firstName}
          />
          <h4>
            {props.owner.firstName + " "}
            {props.owner.lastName}
          </h4>
          <span className="post-date">{props.date}</span>
        </div>
        <div className="single-post-title">
          <h2>{props.title}</h2>
        </div>
        <div className="single-post-image">
          <img className="post-image" src={props.image} alt={props.title} />
        </div>
        <div className="single-post-footer">
          <p>
            <span style={{ fontWeight: "bold" }}>{props.likes}</span> likes
          </p>
          <Link className="single-post-link" to={`/${props.id}`}>
            View Full Post
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Post;
