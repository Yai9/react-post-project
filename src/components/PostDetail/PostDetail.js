import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './PostDetail.css'

const PostDetail = (props) => {

	const [postDetail, setDetail] = useState()
	const [comments, setComments] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetch(
        `https://dummyapi.io/data/v1/post/${props.match.params.id}`,
        {
          headers: {
            "app-id": "616dd2a1aabb17f7eeb7ff58",
          },
        }
      );

      const commentsData = await fetch(
        `https://dummyapi.io/data/v1/post/${props.match.params.id}/comment?limit=10`,
        {
          headers: {
            "app-id": "616dd2a1aabb17f7eeb7ff58",
          },
        }
      );
      const result = await postData.json();
      const comments = await commentsData.json();
      setDetail(result);
      setComments(comments);
      return result;
    };

    fetchData();
  }, []);


	console.log(postDetail,'postDetail')
	console.log(comments,'commentDetail')
  return (
    <Fragment>
	  {postDetail &&
      <div key={postDetail.id} className="detailed_post">
        <div className="detailed_post_owner">
          <img
            className="profile_image"
            src={postDetail.owner.picture}
            alt={postDetail.owner.firstName}
          />
          <h4>
		  {postDetail.owner.firstName + ' '}
		  {postDetail.owner.lastName} 
          </h4>
          <span className="post_date">{postDetail.publishDate}</span>
        </div>
        <div className="detailed_post_title">
          <h2>{postDetail.text}</h2>
        </div>
        <div className="detailed_post_image">
          <img className="post_image" src={postDetail.image} alt={postDetail.title} />
        </div>
        <div className="detailed_post_footer">
		  <div>
          <p><span style={{fontWeight:"bold"}}>{postDetail.likes}</span> likes</p>
		  <div className="post_tags">{postDetail.tags.map(tag=><li key={tag}>{tag}</li>)}</div>
       </div>
		  <div className="post_comments">comments</div>
		  </div>
	<Link className="detailed_post_link" to="/">Back</Link>
      </div>
	  }
    </Fragment>
  );

}



export default PostDetail;
