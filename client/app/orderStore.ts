import { type OrderState, type PizzaOrder } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Create a zustand data store so we can pass data between the pages/components.
 */
export const orderStore = create<OrderState>()(
    persist( set => ({
        orders : [],
        addOrder : (order:PizzaOrder) => set((state) => ({ 
            orders: [...state.orders, order]
        }))
    }), {
    name: 'slice_orders',
    skipHydration: true
}));