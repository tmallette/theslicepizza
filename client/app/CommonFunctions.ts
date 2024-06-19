/**
 * This function allows us to use a bool to determine what css is applied.
 * .filter(Boolean) is shorthand for .filter(item => Boolean(item))
 * @param classes 
 * @returns 
 */
export const classNames = ( ...classes : any ) => {
    return classes.filter(Boolean).join(' ')
};

/**
 * Find a specific item in an array.
 * @param id 
 * @param arr 
 * @returns 
 */
export const findObjectById = (id:string, arr:Array<any>) => {
    return arr.find(item => item.id === id);
}

/**
 * Grab our pizza data from the BE
 * @returns 
 */
export const getPizzaData = async () => {
    const res = await fetch('http://localhost:3000/api/', {
      method: 'GET',
      // This is mainly for testing, but since we're pulling data in from BE on the server. 
      // The server will aggresively cache it.
      // revalidate causes the server to re fetch the data after x time.
      next: { revalidate: 1000 }
    });
    return res.json();
  }