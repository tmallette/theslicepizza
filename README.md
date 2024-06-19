## How to run

The project has two sub folders, `client` and `server`. The client folder has the Next 14 project and the server folder has a small node.js server for doing socket.io stuff for the real timer tracking.

Open up two terminals.

One for client:

```
cd client
npm i
npm run dev
```

One for server:

```
cd server
npm i
npm run server
```

### Explanation

I went with Next 14 for the FE because its what I've been using recently for fun. I'm using tailwind and DaisyUI. For the backend, its just a node server with express and socket.io.

For data storing on the client I'm using zustand. Its the first time I'm using it and it seems pretty awesome. I'm storing the current cart data in one store and another store to hold all orders for past orders. This data then goes into localstorage via zustand.

Most pages have a component that go with them. I did this so that I could extract out the client side parts into the component and leave the pages to be server side rendered. If you build the project the build should show all pages as ssr. I also did this for the nav, the cart icon that shows the number of pizzas is a separate component that is client so the nav can stay ssr.

I decided to hold all of the data for the pizzas in a json file that I then fetch from `app/api/route.ts`. This holds all of the pizza parts(crust, bake, cut, toppings, etc) and data for the pizzas themselves. This way I can use this for the pizza creator and also the menu. I then pull the data from the BE into the respective ssr pages. This means that the pages won't have to grab the data again because its done on the server.

For the tracker. I open up a socket connection and listen for steps, then update the page based on these.

The flow for the site is: Home -> Menu -> Create -> Cart -> Checkout -> Tracker. You can also go to Edit a pizza from Cart. I also have a Account page to show past orders, an about page and a custom 404 page.

I think thats about it. Let me know if you have questions.
