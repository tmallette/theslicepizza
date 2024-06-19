'use client';

import React, { useEffect, useState } from 'react';
import { cartStore } from '../cartStore';
import { classNames } from '../CommonFunctions';
import { useRouter } from 'next/navigation';
import { orderStore } from '../orderStore';
import { customAlphabet } from 'nanoid';
import { type PizzaOrder } from '@/types';
import Link from 'next/link';

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

const orderTypes = [{
  id: 'delivery',
  name: 'Delivery'
},{
  id: 'pick-up',
  name: 'Pick up'
}];

/**
 * Shows the user their order and collects their info for the checkout.
 * @returns 
 */
export default function PizzaCheckout() {
  const router = useRouter();
  const pizzas = cartStore((state)=> state.pizzas);
  const total = cartStore((state)=> state.total);
  const clearOrder = cartStore((state)=> state.clear);
  const addOrder = orderStore((state)=> state.addOrder);

  const [orderType, setOrderType] = useState('delivery');

  const handleOrderChange = (type:string) => {
    setOrderType(type);
  }

  /**
   * Create an order and store it in the data store.
   */
  const placeOrder = () => {
    const nanoid = customAlphabet('1234567890', 10);
    const orderDetails : PizzaOrder = {
        pizzas: pizzas,
        total: total,
        date: `${new Date()}`,
        isDelivery: orderType,
        confirmationId: nanoid()
    }

    addOrder(orderDetails);
    clearOrder();
    router.push('/tracker');
  }

  // Lets also create a loading state so that while we pull in the pizza data from zustand we will show a loader.
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
      setLoading(false);
  },[pizzas]);

  if(loading) {
      return(<div className='w-full flex justify-center mt-20'><div className='loading loading-dots loading-lg'></div></div>)
  }

  return (
    <> 
      {pizzas.length>0?
        <ul className='steps flex w-full justify-center p-0'>
          <li className='step step-primary'>Cart</li>
          <li className='step step-primary'>Checkout</li>
          <li className='step'>Tracking</li>
          <li className='step'>Ready</li>
        </ul>:null}

      {pizzas.map((pizza, i : number)=> {
          return(<div className='bg-base-300 rounded-sm p-4 mb-4 w-full flex justify-between' key={i}>
            <div className='font-bold text-xl'>{pizza.quantity}x {pizza.name}</div>
            <div className='text-white font-bold text-xl'>${pizza.price * pizza.quantity}</div>
          </div>)
      })}

    {pizzas.length>0?
      <>
      <div className='text-3xl font-bold text-white mb-12'>Total: ${total.toFixed(2)}</div> 

      <div className='btn-group mb-4'>
        {orderTypes.map((type, i)=> {
          return(<button key={i} className={classNames('btn mr-2',orderType === type.id ? 'btn-active' : '' )} value={type.id} onClick={(e)=>handleOrderChange(e.currentTarget.value)}>{type.name}</button>)
        })}
      </div>

      
      <form className='flex flex-col' action={placeOrder}>
        <label className='flex flex-col'>
          Name:
          <input className='input input-bordered w-full max-w-xs' type='text' name='name' autoComplete='name' required/>
        </label>
        <label className='flex flex-col'>
          Email:
          <input className='input input-bordered w-full max-w-xs' type='email' name='email' autoComplete='email'/>
        </label>
        <label className='flex flex-col'>
          Phone:
          <input className='input input-bordered w-full max-w-xs' type='phone' name='phone' autoComplete='phone' required/>
        </label>
        { orderType === 'delivery' ?
          <>
            <label className='flex flex-col'>
              Address:
              <input className='input input-bordered w-full max-w-xs' type='text' name='address' autoComplete='address' required={orderType === 'delivery'}/>
            </label>
            <label className='flex flex-col'>
              Zip:
              <input className='input input-bordered w-full max-w-xs' type='phone' name='postalCode' autoComplete='postal-code' required={orderType === 'delivery'}/>
            </label>
            <label className='flex flex-col'>
              City:
              <input className='input input-bordered w-full max-w-xs' type='text' name='city' autoComplete='address-level2' required={orderType === 'delivery'}/>
            </label>
            <label className='flex flex-col'>
              State:
              <select className='input input-bordered w-full max-w-xs' name='region' autoComplete='address-level1' required={orderType === 'delivery'}>
                <option key={'default'}value='default'>Select A State</option>
                {states.map((state, i)=> {
                  return (<option key={i} value={state}> {state} </option>)
                })}
              </select>
            </label>
          </>: null
        }
        <button className='btn btn-accent text-white no-underline rounded-sm mr-4 text-xl font-bold w-fit mt-12' type='submit'>Place order</button>
      </form>
      </>: <div className='w-full flex flex-col items-center mt-8'>
      <div>You have no pizzas in your cart.</div>
      <Link className='btn btn-accent text-white no-underline rounded-sm mt-4 text-xl font-bold' href={'/menu'}>Menu</Link>
      </div>}
    </>
  )
}

