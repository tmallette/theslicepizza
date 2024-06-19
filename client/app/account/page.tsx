import React from 'react';
import PizzaAccount from '../components/PizzaAccount';

export default function page() {
  return (
    <article className='prose w-full min-w-full'>
      <h1>The past orders</h1>
      <PizzaAccount />
    </article>
  )
}