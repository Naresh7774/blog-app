import { Link } from 'react-router-dom';

const PostCard = ({ post, isOwnPost, onDelete }) => {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="card mb-4">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                By {post.author.username} • {formattedDate}
            </div>
            <p style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                marginBottom: '1rem',
                color: 'var(--text-main)'
            }}>
                {post.content}
            </p>

            <div className="flex justify-between items-center">
                <Link to={`/posts/${post._id}`} style={{ fontWeight: 500 }}>Read More &rarr;</Link>

                {isOwnPost && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/edit-post/${post._id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Edit</Link>
                        <button
                            onClick={() => onDelete(post._id)}
                            className="btn btn-primary"
                            style={{ backgroundColor: 'var(--error)', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;
