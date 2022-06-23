import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

export const Categories = () => {
  // redux toolkit
  const categoryValue = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  // end redux toolkit

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryValue === i ? 'active' : ''}
            key={i}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
