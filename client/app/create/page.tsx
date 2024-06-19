import React, { Suspense } from 'react';
import PizzaCreator from '../components/PizzaCreator';
import { type PizzaData } from '@/types';
import { getPizzaData } from '../CommonFunctions';

export default async function page() {
  const data : PizzaData = await getPizzaData();
    
  return (
    <article className='prose w-full min-w-full'>
      <h1>The pizza creator</h1>
      <Suspense>
        <PizzaCreator pizzaData={data} />
      </Suspense>
    </article>
  )
}