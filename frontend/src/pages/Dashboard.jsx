import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, getAuthHeader } = useContext(AuthContext);

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const { data } = await axios.get(`${apiUrl}/api/posts`);
                // Filter posts to only show the user's posts
                const myPosts = data.filter(post => post.author._id === user._id);
                setPosts(myPosts);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                await axios.delete(`${apiUrl}/api/posts/${id}`, {
                    headers: getAuthHeader()
                });
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
                Welcome {user.username}! Here you can manage your blog posts.
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
