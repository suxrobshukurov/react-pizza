import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination, listSort } from '../components';

export const Home = () => {
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sort, searchValue, currentPage } = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);

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
      fetchData();
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
      <div className="content__items">{isLoaded ? skeleton : pizzes}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
