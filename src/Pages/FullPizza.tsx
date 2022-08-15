import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();

  useEffect(() => {
    const fetchedPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://62f3af16a84d8c96812980f8.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Такой пиццы нет! Возвращаю на главную...')
        navigate('/')
      }
    };
    fetchedPizza();
  }, []);


  return pizza  ? (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <span>{pizza.price} Р</span>
    </div>
  ) : (
    <h1 className='container'>Загрузка...</h1>
  );
};

export default FullPizza;
