import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/slices/filterSlice';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  // redux toolkit
  const dispatch = useDispatch();
  const { categoryId, sort, searchValue, currentPage } = useSelector((state) => state.filter);
  // const categoryId = useSelector((state) => state.filter.categoryId);
  // const sort = useSelector((state) => state.filter.sort);
  // const searchValue = useSelector((state) => state.filter.searchValue);
  // const currentPage = useSelector((state) => state.filter.currentPage);
  // end redux toolkit

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoaded(true);
        const itemResponse = await axios.get(
          `https://62b07cede460b79df04704b4.mockapi.io/items?page=${currentPage}&limit=4${
            categoryId > 0 ? `&category=${categoryId}` : ''
          }&search=${searchValue}&sortBy=${sort.sort}&order=${sort.order}`,
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
  }, [categoryId, sort, searchValue]);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const pizzes = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoaded ? skeleton : pizzes}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
