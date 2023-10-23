import './styles/app.scss';
import { BrowserRouter, Routes, Route, Navigate,  } from 'react-router-dom';
import SettingsBar from './components/Settingsbar';
import MainPart from './MainPart';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path=':id' element={<MainPart />} />
          <Route path='*' element={ <Navigate to={`f${(+new Date).toString(16)}`} replace/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
