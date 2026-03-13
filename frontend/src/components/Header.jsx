import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{
            backgroundColor: 'var(--surface)',
            boxShadow: 'var(--shadow-sm)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div className="container flex items-center justify-between">
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                    Blog<span style={{ color: 'var(--text-main)' }}>App</span>
                </Link>
                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>Dashboard</Link>
                    <Link to="/create-post" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>Create Post</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
