'use client';

import React, { useEffect, useState } from 'react';
import { orderStore } from '../orderStore';
import { socket } from '../utils/socket';
import { classNames } from '../CommonFunctions';

/**
 * Component used to display the Tracker. We open up a socket connection to the server and it tells us when the next step is.
 * @returns 
 */
export default function PizzaTracker() {
  const [trackerMessage, setTrackerMessage] = useState('Your order was recieved.');
  const [done, setDone] = useState(false);
  const orders = orderStore((state)=> state.orders);
  
  let isDelivery = true;

  // Lets also create a loading state so that while we pull in the pizza data from zustand we will show a loader.
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
      // We also need to check for the delivery type when we are done loading in the data. We'll pass this into the socket server.
      orders[orders.length-1]?.isDelivery === 'delivery';
      setLoading(false);
  },[orders]);

  useEffect(() => {
    // We need to rehydrate the data because we're pulling it in from localstorage.
    orderStore.persist.rehydrate();

    // Tell the server what kind of order this is so it knows what steps to take.
    socket.emit('setOrderType', isDelivery);

    // Update the step when the server tells us.
    socket.on('steps',(e) => {
      setTrackerMessage(e);
    });

    socket.on('done',() => {
      setDone(true);
    });

    return () => {
      socket.off('steps');
      socket.off('done');
    };
  }, []);

  if(loading) {
      return(<div className='w-full flex justify-center mt-20'><div className='loading loading-dots loading-lg'></div></div>)
  }

  return (
    <>
      <div className='text-3xl font-bold text-white mb-12'>Confirmation #: {orders[orders.length-1]?.confirmationId}</div>
      <ul className='steps flex w-full justify-center p-0'>
        <li className='step step-primary'>Cart</li>
        <li className='step step-primary'>Checkout</li>
        <li className='step step-primary'>Tracking</li>
        <li className={classNames('step', done ? 'step-primary' : '')}>{isDelivery ? <span>Delivered</span> : <span>Ready</span> }</li>
      </ul>

      <div className='bg-base-300 rounded-sm p-4 mb-4 flex justify-center'>{trackerMessage}</div>
    </>
  )
}