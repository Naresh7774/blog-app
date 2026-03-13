import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main className="container pt-4 pb-4" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/edit-post/:id" element={<CreatePost isEdit={true} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
