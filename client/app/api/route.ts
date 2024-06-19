/**
 * Returns all of our pizza data.
 * @param req 
 * @returns 
 */
export async function GET(req:Request) {
    const res = {
        "pizzas": [{
            "id":"pepperoni",
            "name":"Pepperoni",
            "desc":"Red sauce base, topped with mozzarella and loaded with pepperoni.",
            "sauce":"red",
            "toppings":["pepperoni","mozzarella"],
            "includedToppings":["pepperoni","mozzarella"],
            "price": 18.99
        },{
            "id":"house",
            "name":"The house",
            "desc":"Red sauce, mozzarella, pepperoni, sausage, ham, bacon, black olives, sliced mushrooms, cherry tomatoes, green peppers, onions and more mozzarella.",
            "sauce":"red",
            "toppings":["mozzarella","pepperoni","sausage","ham","bacon","black_olives","mushrooms","cherry_tomatoes","bell_pepper","onions"],
            "includedToppings":["mozzarella","pepperoni","sausage","ham","bacon","black_olives","mushrooms","cherry_tomatoes","bell_pepper","onions"],
            "price": 20.99,
            "featured": true
        },{
            "id":"meat",
            "name":"Meat lover's",
            "desc":"Pepperoni, sausage, ham and bacon on top of red sauce and mozzarella.",
            "sauce":"red",
            "toppings":["pepperoni","bacon","ham","suasage","mozzarella"],
            "includedToppings":["pepperoni","bacon","ham","suasage","mozzarella"],
            "price": 20.99
        },{
            "id":"cheese",
            "name":"Cheese",
            "desc":"Red sauce and mozzarella on our signature crust.",
            "sauce":"red",
            "toppings":["mozzarella"],
            "includedToppings":["mozzarella"],
            "price": 18.99
        },{
            "id":"alfredo",
            "name":"Alfredo",
            "desc":"Alfrefo sauce with mozzarella, sausage, bacon, fresh cherry tomatoes and onions.",
            "sauce":"alfredo",
            "toppings":["mozzarella","sausage","bacon","cherry_tomatoes","onions"],
            "includedToppings":["mozzarella","sausage","bacon","cherry_tomatoes","onions"],
            "price": 18.99
        },{
            "id":"bbq",
            "name":"BBQ",
            "desc":"Shredded mozzarella topped with our signature BBQ chicken, onions, bacon, and a swirl of BBQ sauce.",
            "sauce":"bbq",
            "toppings":["mozzarella","chicken","bacon","onions"],
            "includedToppings":["mozzarella","chicken","bacon","onions"],
            "price": 18.99
        },{
            "id":"pineapple",
            "name":"Pineapple",
            "desc":"Red sauce, mozzarella, ham, bacon, onions, pineapple and jalapeños.",
            "sauce":"red",
            "toppings":["mozzarella","ham","bacon","onions","pineapple","jalapenos"],
            "includedToppings":["mozzarella","ham","bacon","onions","pineapple","jalapenos"],
            "price": 18.99
        },{
            "id":"veg",
            "name":"Veggie",
            "desc":"Red sauce, mozzarella, spinach, green peppers, sliced mushrooms, onions, black olives and cherry tomatoes.",
            "sauce":"red",
            "toppings":["mozzarella","bell_pepper","mushrooms","black_olives","spinach","cherry_tomatoes","onions"],
            "includedToppings":["mozzarella","bell_pepper","mushrooms","black_olives","spinach","cherry_tomatoes","onions"],
            "price": 18.99
        },{
            "id":"custom",
            "name":"Custom",
            "desc":"Build your own pizza. Starts with red sauce, and mozzarella cheese. Select ingredients to build your own pizza. Vegan cheese and meat also available.",
            "sauce":"red",
            "toppings":["mozzarella"],
            "includedToppings":["mozzarella"],
            "price": 16.99
        }],
        "crusts": [{
            "id":"pan",
            "name":"Pan crust"
        },{
            "id":"thin",
            "name":"Thin crust"
        },{
            "id":"cauliflower",
            "name":"Cauliflower crust"
        }],
        "sizes": [{
            "id":"small",
            "name":"Small 11\"",
            "cost":0
        },{
            "id":"medium",
            "name":"Medium 14\"",
            "cost":2.99
        },{
            "id":"large",
            "name":"Large 16\"",
            "cost":4.99
        }],
        "cuts": [{
            "id":"regular",
            "name":"Regular"
        },{
            "id":"chicago",
            "name":"Chicago"
        },{
            "id":"double",
            "name":"Double"
        }],
        "sauces": [{
            "id":"red",
            "name":"Red sauce"
        },{
            "id":"bbq",
            "name":"BBQ sauce"
        },{
            "id":"alfredo",
            "name":"Alfredo sauce"
        },{
            "id":"none",
            "name":"None"
        }],
        "bakes": [{
            "id":"regular",
            "name":"Regular"
        },{
            "id":"well_done",
            "name":"Well done"
        }],
        "toppings" :[{
            "meats": [{
                "id":"pepperoni",
                "name":"Pepperoni",
                "cost": 1.99
            },{
                "id":"bacon",
                "name":"Bacon",
                "cost": 1.99
            },{
                "id":"chicken",
                "name":"Chicken",
                "cost": 1.99
            },{
                "id":"ham",
                "name":"Ham",
                "cost": 1.99
            },{
                "id":"sausage",
                "name":"Sausage",
                "cost": 1.99
            },{
                "id":"vegan_chorizo",
                "name":"Vegan chorizo",
                "cost": 2.99
            }],
            "cheeses":[{
                "id":"mozzarella",
                "name":"Mozzarella",
                "cost": 0.99
            },{
                "id":"fresh_mozzarella",
                "name":"Fresh mozzarella",
                "cost": 0.99
            },{
                "id":"parmesan",
                "name":"Parmesan",
                "cost": 0.99
            },{
                "id":"vegan_cheese",
                "name":"Vegan cheese",
                "cost": 1.99
            }],
            "veggies":[{
                "id":"bell_pepper",
                "name":"Bell pepper",
                "cost": 0.99
            },{
                "id":"garlic",
                "name":"Garlic",
                "cost": 0.99
            },{
                "id":"jalapenos",
                "name":"Jalapenos",
                "cost": 0.99
            },{
                "id":"mushrooms",
                "name":"Mushrooms",
                "cost": 1.99
            },{
                "id":"black_olives",
                "name":"Black olives",
                "cost": 0.99
            },{
                "id":"pineapple",
                "name":"Pineapple",
                "cost": 0.99
            },{
                "id":"spinach",
                "name":"Spinach",
                "cost": 0.99
            },{
                "id":"cherry_tomatoes",
                "name":"Cherry tomatoes",
                "cost": 0.99
            },{
                "id":"onions",
                "name":"Onions",
                "cost": 0.99
            }]
        }]
    }

    return Response.json(res);
}

export async function POST() { }