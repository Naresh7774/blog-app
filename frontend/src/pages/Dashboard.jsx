import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        let retryCount = 0;

        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/posts`);
                if (isMounted) {
                    setPosts(data);
                    setLoading(false);
                    setError('');
                }
            } catch (err) {
                if (isMounted) {
                    retryCount++;
                    if (retryCount < 12) {
                        setError('Backend is waking up... Please wait.');
                        setTimeout(fetchPosts, 5000);
                    } else {
                        setError('Failed to connect to the backend. Please refresh.');
                        setLoading(false);
                    }
                }
            }
        };

        fetchPosts();
        return () => { isMounted = false; };
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${API_URL}/api/posts/${id}`);
                setPosts(posts.filter(post => post._id !== id));
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    if (loading) return <div className="text-center mt-4">Loading your dashboard...</div>;
    if (error) return <div className="text-center mt-4 text-error">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4 mt-2">
                <h1 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Your Dashboard</h1>
                <Link to="/create-post" className="btn btn-primary">Create New Post</Link>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Manage all blog posts from here.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {posts.length === 0 ? (
                    <div className="text-center" style={{ gridColumn: '1 / -1', padding: '3rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)' }}>
                        <p className="mb-4">You haven't written any posts yet.</p>
                        <Link to="/create-post" className="btn btn-primary">Write Your First Post</Link>
                    </div>
                ) : (
                    posts.map(post => (
                        <PostCard key={post._id} post={post} isOwnPost={true} onDelete={handleDelete} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
