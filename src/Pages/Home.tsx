import React, { useCallback, useEffect } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import Categories from '../Components/Categories/Categories';
import Pagination from '../Components/Pagination';
import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Sort, { menuList } from '../Components/Sort/Sort';
import { setCategoryId, setPageCount, setParams } from '../redux/slices/filterSlices';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sortedItem = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const order = sortedItem.includes('-') ? 'asc' : 'desc';
  const sortBy = sortedItem.replace('-', '');
  const categoryItem = useSelector((state: RootState) => state.filter.categoryId);
  const pizzasList = useSelector((state: RootState) => state.pizza.items);
  const status = useSelector((state: RootState) => state.pizza.status);
  const currnetPage = useSelector((state: RootState) => state.filter.pageCount);
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);
  const isRender = useRef(false);

  const fetch = async () => {
    dispatch(
      //@ts-ignore
      fetchPizzas({
        order,
        sortBy,
        categoryItem,
        currnetPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = menuList.find((item) => item.sortProperty === params.sortProperty);
      dispatch(
        setParams({
          ...params,
          // @ts-ignore
          sort,
        }),
      );
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [categoryItem, sortedItem, currnetPage, searchValue]);

  useEffect(() => {
    if (isRender.current) {
      const queryString = qs.stringify({
        sortProperty: sortedItem,
        categoryItem,
        currnetPage,
      });

      navigate(`?${queryString}`);
    }

    isRender.current = true;
  }, [categoryItem, sortedItem, currnetPage]);

  const setCategory = useCallback((idx: number) => {
      dispatch(setCategoryId(idx))
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          item={categoryItem}
          onClickCategory={setCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <h2>Error</h2>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(8)].map((_, idx) => <Skeleton key={idx} />)
            : pizzasList
                .filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((pizza: any) => <PizzaBlock id={pizza.id} key={pizza.id} pizza={pizza} />)}
        </div>
      )}
      <Pagination onChangePage={(idx: number) => dispatch(setPageCount(idx))} />
    </div>
  );
};

export default Home;
