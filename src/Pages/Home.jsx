import React from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';

import { Categories, Sort, PizzaBlock, Skeleton } from '../components';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  // redux toolkit
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue);
  // end redux toolkit

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

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const pizzes = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoaded ? skeleton : pizzes}</div>
    </div>
  );
};
export default Home;
