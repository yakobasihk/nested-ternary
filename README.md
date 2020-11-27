# What is this ?

Small package for handling nested ternary statements, allowing you to read your code better

# Installation

`npm i nested-ternary`

# Basic Usage

```
const nt = require('nested-ternary');
// or import nt from 'nested-ternary'

// lets model a simple number guessing game
const num = Math.ceil(Math.random() * 100) // 1 - 100
const guess = someUser.input

// checks condition using key:cond in the object passed in
// returns key:t if true, key:f if false
// t/f can be objects themselves with keys cond,t & f
nt({
  cond: guess === num,
  t: 'winner',
  f: {
    cond: guess < num,
    t: 'too low',
    f: 'too high'
  }
});
```

# Advanced Usage (Lazy Loading)

sometimes you need to lazy load your values so that the complier does not compile them and return an error because of some missing attribute or function

```
const nt = require('nested-ternary');

//lets model an array of values coming from a stock exchange api
//lets assume that there will always be a name but value, prefix, suffix and format will be dynamic

const data = [
  {
    name: 'icorp'
    value: 4,
    prefix: '$',
    suffix: 'per share',
    format: (n) => n.toLocaleString()
  },
  {
    name: 'eu inc'
    value: 7,
    prefix: '€',
    suffix: 'per share',
  },
  {
    name: 'dead corp'
  },
]

data.forEach(stock => nt({
  cond: stock.value,
  t: {
    cond: stock.format,
    t: () => `${stock.prefix || ''}${stock.format(stock.value)}${stock.suffix || ''},
    f: () => `${stock.prefix || ''}${stock.value}${stock.suffix || ''}
  },
  f: () => 'stock removed or unavailable'
  })();
);
```

we have to make sure that the value of t and f is a function whenever we want to return a final value (as in not nesting another object).
we need this so that the compiler does not try to evaluate the value, in our example here format is missing from the last 2 stocks so if we removed the function set up: '() =>' then we run into an error since stock.format(...) is not a function.
