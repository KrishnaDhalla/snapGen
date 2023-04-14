import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Generator from './components/Generator';
function App() {
  return (
    <Router>
    <div className="App" >
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/generate" element={<Generator/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
