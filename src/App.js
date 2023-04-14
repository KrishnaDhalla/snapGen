import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Generator from './components/Generator';
import { ThemeProvider } from '@emotion/react';
function App() {
  return (
    <Router>
    <div className="App" >
      {/* <ThemeProvider  enableSystem={true} attribute="class"> */}
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/generate" element={<Generator/>}/>
    </Routes>
    {/* </ThemeProvider> */}
    </div>
    </Router>
  );
}

export default App;
