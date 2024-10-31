import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/taches" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
