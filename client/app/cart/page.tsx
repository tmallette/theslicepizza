import React from 'react';
import PizzaCart from '../components/PizzaCart';

export default function page() {
  return (
    <article className='prose w-full min-w-full'>
      <h1>The cart</h1>
      <PizzaCart />
    </article>
  )
}