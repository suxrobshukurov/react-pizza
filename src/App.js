import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import './scss/app.scss';
// import pizzes from "./assets/pizzes.json";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get('https://62b07cede460b79df04704b4.mockapi.io/items');
        setItems(itemResponse.data);
        setIsLoaded(false);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home items={items} isLoaded={isLoaded} />} />
      <Route path="cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
