'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout( () => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get('/monkey-message', (req, res) => {
    const messages = [
      'Don’t monkey around with me.',
      'If you pay peanuts, you get monkeys.',
      'I fling 💩 at you!',
      '🙊',
      '🙈',
      '🙉',
    ];
    const randomMsgIndex = Math.round(Math.random() * 5);
    const message = { author: 'monkey', text: messages[randomMsgIndex] };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout( () => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get('/parrot-message', (req, res) => {
    const userInput = req.query;
    const message = { author: 'parrot', text: userInput.text };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout( () => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
    console.log(req.query);
  })

  .get('/bot-message', (req, res) => {
    // Grab user input from query
    const userInput = req.query;
    // Define commonGreetings array
    const commonGreetings = ['hi', 'hello', 'howdy'];
    // Define commonGreetings array
    const commonGoodbyes = ['goodbye', 'bye', 'ciao'];
    // By default, robot replies back with user's input
    let botResponse = `Bzzt ${userInput.text}`;

    // Define getBotMessage function
    const getBotMessage = (arr, res) => {
      // Loop through array and search string for possible match
      for (let i = 0; i < arr.length; i++) {
        if (userInput.text.toLowerCase().search(arr[i]) !== -1) {
          botResponse = `Bzzt ${res}`;
        }
      }
    }
    
    // Call getBotMessage function and pass the array to be searched
    getBotMessage(commonGreetings, 'Hello');
    getBotMessage(commonGoodbyes, 'Farewell');

    const message = { author: 'bot', text: botResponse };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout( () => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
