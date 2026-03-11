import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const { data } = await axios.get(`${apiUrl}/api/posts`);
                setPosts(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="text-center mt-4">Loading posts...</div>;
    if (error) return <div className="text-center mt-4 text-error">{error}</div>;

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Latest Stories</h1>
                <p style={{ color: 'var(--text-muted)' }}>Read what our community is writing about today.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {posts.length === 0 ? (
                    <p className="text-center" style={{ gridColumn: '1 / -1' }}>No posts available.</p>
                ) : (
                    posts.map(post => (
                        <PostCard key={post._id} post={post} isOwnPost={false} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
