import { useState } from 'react';
import { Button } from 'primereact/button';

function isPrime(number) {

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export default function Counter({ initialCount }) {
  const initialCountIsPrime = isPrime(initialCount);

  const [counter, setCounter] = useState(initialCount);
  console.log('<Counter /> rendered', initialCount, counter);


  function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <Button onClick={handleDecrement}>
          - Decrement
        </Button>
        <input type='number' value={counter} />
        <Button onClick={handleIncrement}>
           + Increment
        </Button>
      </p>
    </section>
  );
}
