import './PostCard.scss';

const PostCard = ({ post, onClick }) => {
  return (
    <div className="post-card" onClick={onClick}>
      <h5 className="post-title">{post.title}</h5>
      <p className="post-author">By {post.author}</p>
      <p className="post-rating">🐾 {post.pet_friendly_rating}/5</p>
    </div>
  )
}

export default PostCard
