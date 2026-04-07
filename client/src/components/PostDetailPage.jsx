import './PostDetailPage.scss';

const PostDetailPage = ({ selectedPost,handleClosePost }) => {

    const onClose = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            handleClosePost();
        }
    };

  return (
    <div>
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <button className="modal-close-btn" onClick={handleClosePost} aria-label='close'>
                    ×
                </button>

                <h2 className="modal-title">{selectedPost.title}</h2>
                <p className="modal-meta">
                    By {selectedPost.author}
                    <br />
                    <span 
                        role="img" 
                        aria-label="Pet friendly rating:"
                    >
                        🐾
                    </span>
                    {selectedPost.pet_friendly_rating}/5
                </p>

                <div className="modal-body">
                    <p>{selectedPost.content}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetailPage
