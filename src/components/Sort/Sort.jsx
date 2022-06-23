import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType } from '../../redux/slices/filterSlice';

export const Sort = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const list = [
    { name: 'Наиболее популярный', sort: 'rating', order: 'desc' },
    { name: 'Наименее популярный', sort: 'rating', order: 'asc' },
    { name: 'Сначала дорогие', sort: 'price', order: 'desc' },
    { name: 'Сначала дешевое', sort: 'price', order: 'asc' },
    { name: 'По алфавиту', sort: 'title', order: 'desc' },
    { name: 'С конца алфавиту', sort: 'title', order: 'asc' },
  ];
  // redux toolkit
  const sortValue = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();
  // end redux toolkit
  const onClickListItem = (obj) => {
    dispatch(setSortType(obj));
    setIsOpen(!isOpen);
  };
  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          className={isOpen ? 'active' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortValue.name}</span>
      </div>

      {isOpen && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sortValue.name === obj.name ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
