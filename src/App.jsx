import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Saved from './pages/Saved';
import Add from './pages/Add';

import { register } from './serviceWorkerRegistration';
register();

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
