import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch post');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <div className="text-center mt-4">Loading article...</div>;
    if (error) return <div className="text-center mt-4 text-error">{error}</div>;
    if (!post) return <div className="text-center mt-4">Post not found</div>;

    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">
                &larr; Back
            </button>

            <article className="card" style={{ padding: '3rem' }}>
                <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: 1.2 }}>
                        {post.title}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}>
                            {post.author.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{post.author.username}</div>
                            <div style={{ fontSize: '0.875rem' }}>{formattedDate}</div>
                        </div>
                    </div>
                </header>

                <div style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'var(--text-main)',
                    whiteSpace: 'pre-wrap'
                }}>
                    {post.content}
                </div>
            </article>
        </div>
    );
};

export default PostDetail;
