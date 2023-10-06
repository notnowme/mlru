import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home'
import Movies from './pages/Movies'
import Movies2 from './pages/Movies2'
import MovieDetail from './pages/MovieDetail'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movies' element={<Movies2 />} />
      <Route path='/movies/:id' element={<MovieDetail />} />
    </Routes>
    </>
  );
}

export default App;
