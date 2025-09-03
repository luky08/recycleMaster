import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReSort from './recycleMaster/ReSort/ReSort';
import Tabs from './recycleMaster/Tabs/Tabs';
import ReCraft from './recycleMaster/ReCraft/ReCraft';
import ReStore from './recycleMaster/ReStore/ReStore';

function App() {

  return (
    <>
      <Router>
        
      <Tabs/>
      <Routes>
        <Route path="/resort" element={<ReSort/>} />
        <Route path="/recraft" element={<ReCraft/>} />
        <Route path="/restore" element={<ReStore/>} />
        <Route path="*" element={<h2>404 – Stránka nenalezena</h2>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
