import React from 'react'

const PostDetail = (props) => {

  return (
    <Fragment>
      <div key={props.id} className="detailed_post">
        <div className="detailed_post_owner">
          <img
            className="profile_image"
            src={props.owner.picture}
            alt={props.owner.firstName}
          />
          <h4>
            {props.owner.firstName} {props.owner.lastName}
          </h4>
          <span className="post_date">{props.date}</span>
        </div>
        <div className="detailed_post_title">
          <h2>{props.title}</h2>
        </div>
        <div className="detailed_post_image">
          <img className="post_image" src={props.image} alt={props.title} />
        </div>
        <div className="detailed_post_footer">
          <p><span style={{fontWeight:"bold"}}>{props.likes}</span> likes</p>
	<Link to={`/${props.id}`}>View Full Post</Link>
        </div>
      </div>
    </Fragment>
  );

}



export default PostDetail;
