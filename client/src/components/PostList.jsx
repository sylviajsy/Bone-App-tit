import PostCard from "./PostCard";
import './PostList.scss';

const PostList = ({ posts,handleOpenPost }) => {
  return (
    <div className="post-list">
      <div className="post-list-header">
        <h2>All Posts</h2>
        <p>{posts.length} posts</p>
      </div>

      <div className="post-list-content">
        {posts.length>0 ? (
            <div className="post-card-container">
                {posts.map((post) =>(
                    <PostCard 
                        key={post.id}
                        post={post}
                        onClick={() => handleOpenPost(post.id)}
                    />
                ))}
            </div>
        ):(
            <p>No posts yet.</p>
        )}
      </div>
    </div>
  )
}

export default PostList
