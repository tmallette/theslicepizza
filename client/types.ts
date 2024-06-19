export type Pizza = {
    id?: string;
    name: string,
    desc?: string,
    crust: string;
    size: string;
    cut: string;
    bake: string;
    sauce: string;
    toppings: Array<string>;
    includedToppings: Array<string>;
    quantity: number;
    price: number;
    basePrice: number;
    featured?: boolean;
}

export type Cart = {
    pizzas: Array<Pizza>;
    total: number;
}

export type PizzaParts = {
    id: string;
    name:string;
    text?:string;
    cost?:number;
}

type PizzaToppings = {
    meats:Array<PizzaParts>;
    cheeses:Array<PizzaParts>;
    veggies:Array<PizzaParts>;
}

export type PizzaData = {
    pizzas:Array<Pizza>;
    crusts:Array<PizzaParts>;
    sizes:Array<PizzaParts>;
    cuts:Array<PizzaParts>;
    sauces:Array<PizzaParts>;
    bakes:Array<PizzaParts>;
    toppings:Array<PizzaToppings>;
}

export type PizzaOrder = {
    pizzas: Array<Pizza>;
    total: number;
    date: string;
    isDelivery: string;
    confirmationId: string;
}

export type CartState = {
    pizzas : Array<Pizza>;
    total: number;
    addPizza:(pizza:Pizza)=>void;
    removePizza:(pizzaIndex:number)=>void;
    updatePizza:(pizzaIndex:number, pizza:Pizza)=>void;
    updatePizzaQuantity:(pizzaIndex:number, quantity:number)=>void;
    setCart:(pizzas:Array<Pizza>, total:number)=>void;
    clear:()=>void;
}

export type OrderState = {
    orders : Array<PizzaOrder>;
    addOrder : (order:PizzaOrder)=>void;
}