import React from 'react';
import axios from 'axios';

import { Categories, Sort, PizzaBlock, Skeleton } from '../components';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'Наиболее популярный',
    sort: 'rating',
    order: 'desc',
  });


  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoaded(true);
        const itemResponse = await axios.get(
          `https://62b07cede460b79df04704b4.mockapi.io/items?${
            categoryId > 0 ? `category=${categoryId}` : ''
          }&sortBy=${sortType.sort}&order=${sortType.order}`,
        );
        setItems(itemResponse.data);
        setIsLoaded(false);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryId} onClinkCategory={(id) => setCategoryId(id)} />
        <Sort sortValue={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
export default Home;
