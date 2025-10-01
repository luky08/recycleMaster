import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReSort from './recycleMaster/ReSort/ReSort';
import Tabs from './recycleMaster/Tabs/Tabs';
import ReCraft from './recycleMaster/ReCraft/ReCraft';
import ReStore from './recycleMaster/ReStore/ReStore';
import WasteStats from './recycleMaster/WasteStats/WasteStats';
import NamePage from './recycleMaster/Page/NamePage';
import RecycleMasterProgress from './recycleMaster/RecycleMasterProgress';



function LayoutWrapper(){


    
  const location = useLocation();

  const shouldShowLayout = location.pathname !== '/';
    return(
        
    <>
      {shouldShowLayout && <WasteStats />}
      {shouldShowLayout && <RecycleMasterProgress />}
      {shouldShowLayout && <Tabs />}


      <Routes>
        <Route path="/" element={<NamePage />} />
        <Route path="/resort" element={<ReSort />} />
        <Route path="/recraft" element={<ReCraft />} />
        <Route path="/restore" element={<ReStore />} />
        <Route path="*" element={<h2>404 – Stránka nenalezena</h2>} />
      </Routes>
    </>
    )
}

export default LayoutWrapper;