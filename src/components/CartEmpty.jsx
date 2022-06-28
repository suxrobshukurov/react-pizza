import React from 'react';
import { Link } from 'react-router-dom';
import emptyImg from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyImg} alt="Empty cart" />
        <Link to="/react-pizza" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};