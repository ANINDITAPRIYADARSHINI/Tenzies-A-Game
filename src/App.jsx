import React from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  //helper functtion
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    //new array to hold "myNumbers"
    const newDice = [];
    //loop 10 times
    for (let i = 0; i < 10; i++) {
      //push a random number from 1-6 to my array
      newDice.push(generateNewDie());
    } //return array:holding the newNumbers
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="bg-gray-100 h-400 max-w-800 rounded-lg p-20 flex flex-col justify-around items-center">
      {tenzies && <Confetti />}

      <h1 className="text-2xl font-bold m-0 mb-10">Tenzies</h1>

      <p className="font-sans font-normal mt-0 mb-10 text-center">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="grid grid-cols-5 grid-rows-auto gap-20 mb-40">
        {diceElements}
      </div>

      <button
        onClick={rollDice}
        className="h-12 w-36 border-none rounded-md bg-purple-700 text-white text-lg cursor-pointer focus:outline-none active:shadow-inner"
      >
        {tenzies ? 'New Game ' : 'Roll'}
      </button>
    </main>
  );
}
