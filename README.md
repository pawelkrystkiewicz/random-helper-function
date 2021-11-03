# random-helper-function

## description
Create a helper function that will be used to determine the output of an array of data.
Each element of the array has the following structure:

```js
	{
	    state: <String> // a state to go to
	    errorCode: <String> // optional error code
	}
```
The states have different functionalities:
* 'processing' = delay by 2 seconds, then fetch the next state
*	'error' = handle the error code provided (see below)
*	'success' = return from the helper with the object: { title: 'Order complete' message: null }
Handling error codes:
*	'NO_STOCK' = return from the helper with an object: { title: 'Error page', message: 'No stock has been found' }
*	'INCORRECT_DETAILS' = return from the helper with an object: { title: 'Error page', message: 'Incorrect details have been entered' }
*	null = return from the helper with an object: { title: 'Error page', message: null }
*	undefined = return from the helper with an object: { title: 'Error page', message: null }


## Setup
To run application you need to have node installed atleast version 12

After that you just
> yarn start

## Tests
To run test please install dependencies:
> yarn

Running tests once:
> yarn test

Running tests in watch mode:

> yarn test:watch
