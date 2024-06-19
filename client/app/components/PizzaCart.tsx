'use client';

import React, { useEffect, useState } from 'react';
import { cartStore } from '../cartStore';
import Link from 'next/link';
import { type Pizza } from '@/types';
import { FaAngleDown } from 'react-icons/fa6';

/**
 * Shows the user their order. They can update the pizzas here and continue the checkout.
 * @returns 
 */
export default function PizzaCart() {
  const pizzas : Array<Pizza>= cartStore((state)=> state.pizzas);
  const total = cartStore((state)=> state.total);
  const removePizza = cartStore((state)=> state.removePizza);
  const updatePizzaQuantity = cartStore((state)=> state.updatePizzaQuantity);

  let quantityOptions = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(<option key={i} value={i}> {i} </option>);
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
          <li className='step'>Checkout</li>
          <li className='step'>Tracking</li>
          <li className='step'>Ready</li>
        </ul>:null
      }

      {pizzas.map((pizza : Pizza, i : number)=> {
        const removePizzaFromCart = (pizzaId:number) => {
          removePizza(pizzaId);
        }

        return(
          <div className='bg-base-300 rounded-sm p-4 mb-4' key={i}>
            <div className='flex flex-row justify-between items-center mb-6'>
              <h2 className='capitalize p-0 m-0'>{pizza.name}</h2>
              <div className='text-white 3xl font-bold'>${(pizza.price * pizza.quantity).toFixed(2)}</div>
            </div>

            <div className='collapse bg-base-100 rounded-sm mb-4'>
              <input type='checkbox' /> 
              <div className='collapse-title text-lg font-medium flex items-center'>
                Pizza details <FaAngleDown className='ml-2' />
              </div>

              <div className='collapse-content'> 
                <div className='capitalize text-white'>{pizza.crust} crust</div>
                <div className='capitalize text-white'>{pizza.bake.replace('_',' ')} bake</div>
                <div className='capitalize text-white'>{pizza.size}</div>
                <div className='capitalize text-white mb-6'>{pizza.sauce} sauce</div>

                <div>
                  {pizza.toppings.map((topping:string, i:number)=>{
                    if(pizza.includedToppings.includes(topping)) {
                      return (<div className='capitalize' key={i}>{topping.replace('_',' ')}</div>)
                  }})}
                </div>

                <div>
                  {pizza.toppings.map((topping:string, i:number)=>{
                  if(!pizza.includedToppings.includes(topping)) {
                    return (<div className='capitalize text-primary' key={i}>+ {topping.replace('_',' ')}</div>)
                  }})}
                </div>

                <div>
                  {pizza.includedToppings.map((topping:string, i:number)=> {
                  if(!pizza.toppings.includes(topping)) {
                    return (<div className='capitalize text-red-800' key={i}>- {topping.replace('_',' ')}</div>)
                  }})}
                </div>
              </div>
            </div>

            <Link className='btn btn-accent text-white no-underline rounded-sm mr-4 text-xl font-bold' href={`/edit?pizza=${i}`}>Edit</Link>
            <button className='btn btn-accent text-white rounded-sm mr-4 text-xl font-bold' onClick={()=>removePizzaFromCart(i)}>Remove</button>
            <select className='select select-bordered w-36 max-w-xs mt-4' value={pizza.quantity} onChange={(e)=>updatePizzaQuantity(i,+e.currentTarget.value)}>
              { quantityOptions }
            </select>
          </div>
        )
      })}

      {pizzas.length>0?<div className='flex flex-col sm:flex-row items-center w-full justify-between mt-10'>
          <div className='text-3xl font-bold text-white mb-12 sm:mb-0'>Total: ${total.toFixed(2)}</div> 
          <Link className='btn btn-accent text-white no-underline rounded-sm mr-4 text-xl font-bold' href={'/checkout'}>Continue checkout</Link>
        </div>:<div className='w-full flex flex-col items-center mt-8'>
          <div>You have no pizzas in your cart.</div>
          <Link className='btn btn-accent text-white no-underline rounded-sm mt-4 text-xl font-bold' href={'/menu'}>Menu</Link>
        </div>}
    </>
  )
}

