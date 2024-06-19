import React from 'react';
import PizzaCheckout from '../components/PizzaCheckout';

export default function page() {
  return (
    <article className='prose w-full min-w-full'>
      <h1>The checkout</h1>
      <PizzaCheckout />
    </article>
  )
}