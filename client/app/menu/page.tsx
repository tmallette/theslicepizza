import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { type PizzaData } from '@/types';
import { getPizzaData } from '../CommonFunctions';

export default async function page() {
  // Grab the BE pizza data and use it to generate the menu carts.
  const data : PizzaData = await getPizzaData();

  return (
    <article className='prose w-full min-w-full'>
      <h1>The menu</h1>
      <div className=' grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {data.pizzas.map((pizza, i:number)=> {
        return(
          <div key={i}className='flex flex-col bg-base-300 rounded-sm justify-between'>
            <div>
              <Image className='h-auto m-0 p-0' src={`/images/pizzas/${pizza.id}_pizza.png`} alt={`An image of a ${pizza.name} pizza.`} width={180} height={180} style={{ height: 180, width: 180 }} priority /> 
              <div className='p-8'>
                <h2 className='m-0 mb-2'>{pizza.name}</h2>
                <div className='mb-4'>{pizza.desc}</div>
              </div>
            </div>
            <Link key={i} className='btn btn-accent text-white no-underline rounded-sm mr-4 text-xl font-bold w-fit m-8 mt-0 ' href={`/create?pizza=${pizza.id}` }>Add pizza</Link>
          </div>);
      })}
      </div>
    </article>
  )
}