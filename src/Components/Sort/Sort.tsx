import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlices';
import { RootState } from '../../redux/store';

type menuItem = {
  name: string;
  sortProperty: string;
};

export const menuList: menuItem[] = [
  { name: 'популярности(DESC)', sortProperty: 'rating' },
  { name: 'популярности(ASC)', sortProperty: '-rating' },
  { name: 'цене(DESC)', sortProperty: 'price' },
  { name: 'цене(ASC)', sortProperty: '-price' },
  { name: 'алфавиту(DESC)', sortProperty: 'title' },
  { name: 'алфавиту(ASC)', sortProperty: '-title' },
];

const Sort: React.FC = React.memo(() => {
  const currentCategory = useSelector((state: RootState) => state.filter.sort.name);
  const sortId = useSelector((state: RootState) => state.filter.sort);
  const [activeMenu, setActiveMenu] = useState(false);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const setSortCategory = () => {
    setActiveMenu(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // eslint-disable-next-line no-restricted-globals
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setActiveMenu(false);
      }
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={activeMenu ? 'rotateArrow' : 'NotRotateArrow'}
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
        <span onClick={() => setActiveMenu(!activeMenu)}>{currentCategory}</span>
      </div>
      {activeMenu && (
        <div className="sort__popup">
          <ul onClick={setSortCategory}>
            {menuList.map((menu, idx) => (
              <li
                key={menu.name}
                onClick={() => dispatch(setSort(menu))}
                className={sortId.sortProperty === menu.sortProperty ? 'active' : ''}>
                {menu.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
