import React from 'react';

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index)
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {
          categories.map((value, i) => (
            <li onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''} key={i}>{value}</li>
          ))
        }
      </ul>
    </div>
  );
}