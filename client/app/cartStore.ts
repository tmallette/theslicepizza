import { type CartState, type Pizza } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const calculateTotal = (pizzaArr:Array<Pizza>) => {
    let newTotal = 0;
    pizzaArr.map((pizza:Pizza)=>{
        newTotal += pizza.price * pizza.quantity;
    });

    return newTotal;
}

/**
 * Create a zustand data store so we can pass data between the pages/components.
 */
export const cartStore = create<CartState>()(
    persist( set => ({
        pizzas : [],
        total: 0,
        addPizza : (pizza:Pizza) => set((state) =>{
            const newPizzasArr = [...state.pizzas, pizza];

            return { pizzas: newPizzasArr, total : calculateTotal(newPizzasArr) };
        }),
        removePizza : (pizzaIndex:number) => set((state) => {
            const newPizzasArr = state.pizzas.filter((_:any,i:number)=> i !== pizzaIndex);

            return { pizzas: newPizzasArr, total : calculateTotal(newPizzasArr) };
        }),
        updatePizza : (pizzaIndex:number, pizza:Pizza) => set((state) =>{
            const newPizzasArr = [...state.pizzas];
            newPizzasArr[pizzaIndex] = pizza;

            return { pizzas: newPizzasArr, total : calculateTotal(newPizzasArr) };
        }),
        updatePizzaQuantity : (pizzaIndex:number, quantity:number) => set((state) =>{
            const newPizzasArr = [...state.pizzas];
            newPizzasArr[pizzaIndex].quantity = quantity;

            return { pizzas: newPizzasArr, total : calculateTotal(newPizzasArr) };
        }),
        setCart : (pizzas:Array<Pizza>, total:number) => set(() => ({ 
            pizzas: pizzas,
            total: total
        })),
        clear : () => set(() => ({ 
            pizzas : [],
            total: 0,
        }),
    
    )}), {
    name: 'slice_cart',
    skipHydration: true
}));