import React from 'react';

export const Categories = ({ categoryValue, onClinkCategory }) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            onClick={() => onClinkCategory(i)}
            className={categoryValue === i ? 'active' : ''}
            key={i}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
