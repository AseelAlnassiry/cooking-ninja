// React Router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

//components
import Navbar from './components/Navbar/Navbar';

// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Create" element={<Create />} />
          <Route path="Search" element={<Search />} />
          <Route path="recipes/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
