import React from 'react';
import PizzaTracker from '../components/PizzaTracker';

export default function page() {
  return (
    <article className='prose w-full min-w-full'>
      <h1>The tracker</h1>
      <PizzaTracker />
    </article>
  )
}