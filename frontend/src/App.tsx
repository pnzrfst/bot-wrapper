
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './scenes/Login';
import Dashboard from './scenes/Dashboard';

//configura as rotas, monta o layout default


function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     </Routes>
     </>
  );
}

export default App;
