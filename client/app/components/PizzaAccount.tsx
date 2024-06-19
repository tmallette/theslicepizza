'use client';

import React, { useEffect, useState } from 'react'
import { orderStore } from '../orderStore';
import { cartStore } from '../cartStore';
import { useRouter } from 'next/navigation';
import { type PizzaOrder } from '@/types';

/**
 * Shows the user their past orders and lets them reorder.
 * @returns 
 */
export default function PizzaAccount() {
    const router = useRouter();
    const orders = orderStore((state)=> state.orders);
    const setCart = cartStore((state)=> state.setCart);
    
    useEffect(()=>{
      // We need to rehydrate the data because we're pulling it in from localstorage.
        orderStore.persist.rehydrate();
    },[]);

    // Lets also create a loading state so that while we pull in the pizza data from zustand we will show a loader.
    const [loading, setLoading] = useState(true);
  
    useEffect(()=> {
        setLoading(false);
    },[orders]);

    if(loading) {
        return(<div className='w-full flex justify-center mt-20'><div className='loading loading-dots loading-lg'></div></div>)
    }

  return (
    <>
      {orders.length>0? orders.map((order:PizzaOrder, i:number)=> {
        const date = new Date(order.date).toLocaleDateString();

        return(
          <div key={i} className='bg-base-300 rounded-sm p-4 mb-4'>
            <div className='flex flex-col md:flex-row justify-between'>
              <div className='font-bold text-xl'>Confirmation #: {order.confirmationId}</div>
              <div className='font-bold text-xl'>${order.total.toFixed(2)}</div>
            </div>
            <div className='capitalize'>{order.isDelivery}</div>
            <div>{date}</div>
            <button className='btn btn-accent text-white no-underline rounded-sm mt-4 text-xl font-bold' onClick={()=>{
              setCart(order.pizzas, order.total);
              router.push('/cart');
            }}>Reorder</button>
          </div>
        )}):<div>You have no past orders.</div>
      }
    </>
  )
}