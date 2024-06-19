'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { classNames, findObjectById } from '../CommonFunctions';
import { cartStore } from '../cartStore';
import { type Pizza, type PizzaData, type PizzaParts } from '@/types';

let defaultPizza : Pizza = {
    name: 'custom',
    crust: 'pan',
    size: 'small',
    cut: 'regular',
    bake: 'regular',
    sauce: 'red',
    toppings: [],
    includedToppings: [],
    quantity: 1,
    price: 18.99,
    basePrice: 18.99
};

/**
 * Component used for creating/editing pizzas. We get passed the pizzaDate from BE.
 * We then use this pizza data to create all of the options.
 * The user can update options and add/update the pizza to the cart.
 * @param param0 
 * @returns 
 */
export default function PizzaCreator({pizzaData, editMode}:{pizzaData:PizzaData,editMode?:boolean}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pizzaParam = searchParams.get('pizza');
    const pizzas = cartStore((state)=> state.pizzas);
    const [pizza, setPizza] = useState<Pizza>(defaultPizza);
    const addPizza = cartStore((state)=> state.addPizza);
    const updatePizza = cartStore((state)=> state.updatePizza);

    // Create and array of toppings so its easier to loop over them all.
    const allToppings = [
        ...pizzaData.toppings[0]['meats'],
        ...pizzaData.toppings[0]['cheeses'],
        ...pizzaData.toppings[0]['veggies']
    ];

    useEffect(()=>{
        // We need to rehydrate the data because we're pulling it in from localstorage.
        cartStore.persist.rehydrate();

        // If we're in in edit mode we need to pull the pizza in from the zustand data store based on the param.
        if(editMode && pizzaParam) {
            defaultPizza = {...defaultPizza, ...pizzas[+pizzaParam]};
            const newPrice = calculatePrice(defaultPizza);
            const basePrice = defaultPizza.price;
            setPizza({...defaultPizza, ['price'] : newPrice, ['basePrice'] : basePrice });
        } 
        // Otherwise, we'll create a base pizza from the pizza data and the param.
        else if(pizzaParam) {
            defaultPizza = {...defaultPizza, ...findObjectById(pizzaParam, pizzaData.pizzas)};
            const price = defaultPizza.price;
            setPizza({...defaultPizza, ['basePrice'] : price });
        }
    },[]);

    /**
     * Handler for updating topping change. This one is special because we need to check topping arrays to figure out if we're adding or removing.
     * We also need to recalc the price.
     * @param ev 
     */
    const handleToppingChange = (ev : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const value = ev.currentTarget.value;
        let toppings = pizza.toppings;

        if(toppings.includes(value)) {
            // Remove
            toppings = toppings.filter(topping => topping !== value);
        } else {
            // Add
            toppings.push(value);
        }

        const newPizza = {...pizza, ['toppings'] : toppings };
        const newPrice = calculatePrice(newPizza);
        setPizza({...newPizza, ['price'] : newPrice});
    }

    /**
     * Handler for updating size change. Special because we need to update the price.
     * @param ev 
     */
    const handleSizeChange = (ev : React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        const value = ev.currentTarget.value;
        const newPizza = {...pizza, ['size'] : value };
        const newPrice = calculatePrice(newPizza);
        setPizza({...newPizza, ['price'] : newPrice});
    }

    /**
     * Standard change handler for the rest of the changes.
     * @param ev 
     * @param target 
     */
    const handlePizzaChange = (ev : React.MouseEvent<HTMLButtonElement, MouseEvent>, target:string) => {
        const value = ev.currentTarget.value;
        setPizza({...pizza, [target] : value });
    }

    /**
     * Calc new pizza price. Pizza has a base price. Price increases for size and toppings.
     * Pizza also includes some toppings for free in `includedToppings`. We should never charge for these.
     * @param p 
     * @returns 
     */
    const calculatePrice = (p:Pizza) => {
        let price = p.basePrice;

        price += findObjectById(p.size, pizzaData.sizes)?.cost || 0;

        p.toppings.map((topping)=>{
            if(!p.includedToppings.includes(topping)) {
                price += findObjectById(topping, allToppings).cost;
            }
        });

        return +price.toFixed(2);
    }

    /**
     * Add pizza to data store.
     */
    const addToCart = () => {
        addPizza(pizza);
        router.push('/cart');
    }

    /**
     * Update or add pizza to data store.
     * This is for edit mode, but adding in an addPizza function if the user ends up doing weird stuff and there is no id for the pizza in the cart.
     */
    const updatePizzaInCart = () => {
        if(pizzaParam && pizzas.length > +pizzaParam) {
            updatePizza(+pizzaParam,pizza);
        } else {
            addPizza(pizza);
        }

        router.push('/cart');
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
            <div className='text-white font-bold text-xl mb-2'>Crust</div>
            <div className='btn-group'>
                {pizzaData.crusts.map((crust:PizzaParts, i:number)=>{
                    return(<button key={i} className={classNames('btn mr-4 mb-4', pizza.crust === crust.id ? 'btn-active' : '')} value={crust.id} onClick={(ev)=>handlePizzaChange(ev,'crust')}>{crust.name}</button>)
                })}
            </div>

            <div className='text-white font-bold text-xl mb-2'>Size</div>
            <div className='btn-group'>
                {pizzaData.sizes.map((size:PizzaParts, i:number)=>{
                    return(<button key={i} className={classNames('btn mr-4 mb-4', pizza.size === size.id ? 'btn-active' : '')} value={size.id} onClick={handleSizeChange}>{size.name}</button>)
                })}
            </div>

            <div className='text-white font-bold text-xl mb-2'>Cut</div>
            <div className='btn-group'>
                {pizzaData.cuts.map((cut:PizzaParts, i:number)=>{
                    return(<button key={i} className={classNames('btn mr-4 mb-4', pizza.cut === cut.id ? 'btn-active' : '')} value={cut.id} onClick={(ev)=>handlePizzaChange(ev,'cut')}>{cut.name}</button>)
                })}
            </div>

            <div className='text-white font-bold text-xl mb-2'>Sauce</div>
            <div className='btn-group'>
                {pizzaData.sauces.map((sauce:PizzaParts, i:number)=>{
                    return(<button key={i} className={classNames('btn mr-4 mb-4', pizza.sauce === sauce.id ? 'btn-active' : '')} value={sauce.id} onClick={(ev)=>handlePizzaChange(ev,'sauce')}>{sauce.name}</button>)
                })}
            </div>

            <div className='text-white font-bold text-xl mb-2'>Bake</div>
            <div className='btn-group'>
                {pizzaData.bakes.map((bake:PizzaParts, i:number)=>{
                    return(<button key={i} className={classNames('btn mr-4 mb-4', pizza.bake === bake.id ? 'btn-active' : '')} value={bake.id} onClick={(ev)=>handlePizzaChange(ev,'bake')}>{bake.name}</button>)
                })}
            </div>

            <h2>Toppings</h2>
            <div className='flex flex-row flex-wrap'>
                {pizzaData.toppings[0]['meats'].map((meat:PizzaParts, i:number)=> {
                    return(
                        <button key={i} className='w-1/2 md:w-1/4 xl:w-1/6 h-36 mb-8' value={meat.id} onClick={handleToppingChange}>
                            <div className={classNames('flex flex-col mx-2 py-4 border-4 rounded-sm justify-center items-center', pizza.toppings.includes(meat.id) ? 'border-accent' : 'border-transparent')}>
                                <Image className='h-auto m-0 p-0' src={`/images/toppings/${meat.id}.png`} alt={`An image of ${meat.name}`} width={90} height={90} style={{ height: 90, width: 90 }} priority /> 
                                <div className='text-white'>{meat.name}</div>
                            </div>
                        </button>
                    )
                })}
            </div>

            <div className='flex flex-row flex-wrap'>
                {pizzaData.toppings[0]['cheeses'].map((cheese:PizzaParts, i:number)=> {
                    return(
                        <button key={i} className='w-1/2 md:w-1/4 xl:w-1/6 h-42 mb-8' value={cheese.id} onClick={handleToppingChange}>
                            <div className={classNames('flex flex-col mx-2 py-4 border-4 rounded-sm justify-center items-center', pizza.toppings.includes(cheese.id) ? 'border-accent' : 'border-transparent')}>
                            <Image className='h-auto m-0 p-0' src={`/images/toppings/${cheese.id}.png`} alt={`An image of ${cheese.name}`} width={90} height={90} style={{ height: 90, width: 90 }} priority /> 
                            <div className='text-white'>{cheese.name}</div>
                            </div>
                        </button>
                    )
                })}
            </div>

            <div className='flex flex-row flex-wrap'>
                {pizzaData.toppings[0]['veggies'].map((veg:PizzaParts, i:number)=> {
                    return(
                        <button key={i} className='w-1/2 md:w-1/4 xl:w-1/6 h-36 mb-8' value={veg.id} onClick={handleToppingChange}>
                            <div className={classNames('flex flex-col mx-2 py-4 border-4 rounded-sm justify-center items-center', pizza.toppings.includes(veg.id) ? 'border-accent' : 'border-transparent')}>
                                <Image className='h-auto m-0 p-0' src={`/images/toppings/${veg.id}.png`} alt={`An image of ${veg.name}`} width={90} height={90} style={{ height: 90, width: 90 }} priority /> 
                                <div className='text-white'>{veg.name}</div>
                            </div>
                        </button>
                    )
                })}
            </div>

            <div className='flex flex-col sm:flex-row items-center w-full justify-between mt-10'>
                <div className='text-3xl font-bold text-white mb-12 sm:mb-0'>Total: ${pizza.price}</div> 
                {editMode ? <button className='btn btn-accent text-white no-underline rounded-sm text-xl font-bold' onClick={updatePizzaInCart}>Update pizza</button>
                    :<button className='btn btn-accent text-white no-underline rounded-sm text-xl font-bold' onClick={addToCart}>Add to cart</button>}
            </div>
        </>
    )
}
