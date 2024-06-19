'use client';

import React, { useEffect, useState } from 'react';
import { cartStore } from '../cartStore';
import { type Pizza } from '@/types';
import { BsCart3 } from 'react-icons/bs';
import Link from 'next/link';


/**
 * Create a cart button that shows the number of pizzas in the cart. Extracting this out so that we can keep the rest of the nav server side.
 * @returns 
 */
export default function ShoppingCartButton() {
  const pizzas : Array<Pizza> = cartStore((state)=>state.pizzas);

  useEffect(()=>{
    // We need to rehydrate the data because we're pulling it in from localstorage.
    cartStore.persist.rehydrate();
  },[]);

  return (
    <Link href={'/cart'} className='ml-4'>
      <div className='relative size-12 flex items-center justify-center'>
        <BsCart3 size={32} />
        {pizzas && pizzas?.length > 0 ? <div className='absolute top-0 right-0 p-2 rounded-full text-white bg-red-600 size-6 flex items-center justify-center'>
          {pizzas?.length}
        </div>:null}
      </div>
    </Link>
  )
}