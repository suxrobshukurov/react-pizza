import React from 'react';
// import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizza/asyncAction';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination, listSort } from '../components';

export const Home = () => {
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sort, searchValue, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  // const [items, setItems] = React.useState([]);
  // const [isLoaded, setIsLoaded] = React.useState(true);

  async function getPizzas() {
    dispatch(
      fetchPizzas({ currentPage, categoryId, searchValue, sort: sort.sort, order: sort.order }),
    );
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listSort.find((obj) => obj.sort === params.sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  React.useEffect(() => {
    if (!isMounted.current) {
      getPizzas();
    }
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sort: sort.sort,
        order: sort.order,
        currentPage,
        categoryId,
      });
      navigate(`?${queryStr}`);
    }
    // isMounted.current = true;
  }, [categoryId, sort, currentPage]);

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
      <div className="content__items">{status === 'loading' ? skeleton : pizzes}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
