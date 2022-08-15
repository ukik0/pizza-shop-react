import React from 'react';

type CategoriesProps = {
  item: number;
  onClickCategory: (idx: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({item , onClickCategory}) => {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, idx) => (
          <li key={category} onClick={() => onClickCategory(idx)}  className={item === idx ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
