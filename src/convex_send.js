const convex = require('convex-stdlib');
const { getAddress } = require('convex-address');

// Define a simple UDF that adds two numbers
const add = (a, b) => {
  return a + b;
};

// Use the convex-stdlib package to interact with the convex network
const main = async () => {
  const myAddress = getAddress('my-account', 'my-passphrase');
  const result = await convex.send(myAddress, add, 2, 3);
  
  // Use the ensure function to ensure multi-user data modification with consistency
  await convex.ensure(
    myAddress,
    () => {
      const currentValue = await convex.query(myAddress, 'my-data');
      return currentValue < 10;
    },
    () => {
      await convex.transfer(myAddress, 'my-data', add(currentValue, 1));
    }
  );
};

main();
