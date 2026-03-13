import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const CreatePost = ({ isEdit = false }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(isEdit);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const { title, content } = formData;

    useEffect(() => {
        if (isEdit && id) {
            const fetchPost = async () => {
                try {
                    const { data } = await axios.get(`${API_URL}/api/posts/${id}`);
                    setFormData({ title: data.title, content: data.content });
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch post details');
                    setLoading(false);
                }
            };
            fetchPost();
        }
    }, [isEdit, id]);

    const onChange = (e) => setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`${API_URL}/api/posts/${id}`, formData);
            } else {
                await axios.post(`${API_URL}/api/posts`, formData);
            }
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div className="card">
                <h1 className="mb-4" style={{ color: 'var(--primary)' }}>
                    {isEdit ? 'Edit Post' : 'Create New Post'}
                </h1>
                {error && <div className="text-error mb-4 p-2 bg-red-100 rounded">{error}</div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Post Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                            placeholder="Enter an engaging title..."
                            style={{ fontSize: '1.25rem', padding: '0.75rem' }}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="content">Content</label>
                        <textarea
                            className="form-control"
                            id="content"
                            name="content"
                            value={content}
                            onChange={onChange}
                            required
                            rows="15"
                            placeholder="Write your blog post content here..."
                            style={{ resize: 'vertical' }}
                        ></textarea>
                    </div>

                    <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? 'Update Post' : 'Publish Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
