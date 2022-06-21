import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import axios from 'axios';

import pizzes from "./assets/pizzes.json";
import React from 'react';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {

    async function fetchData() {
      try {
        const itemResponse = await axios.get('https://62b07cede460b79df04704b4.mockapi.io/items')
        setItems(itemResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((obj) => (
                <PizzaBlock 
                  key={obj.id}
                  {...obj}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
