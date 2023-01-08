import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Forms from './component/Forms';
import Footer from './component/Footer';
import CheckIn from './component/CheckIn';

function App() {
  return (
    <>
    <Footer/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Forms/>} />
      <Route path='/successfull-entry' element={<CheckIn/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
