import { useState } from 'react';
import DicePool from './steps/DicePool';
import Reroll from './steps/Reroll';

function App() {

  const [activeStep, setActiveStep] = useState('dice-pool');
  const [threat, setThreat] = useState(5);

  const [dices, setDices] = useState({
    red: {
      count: 3,
      values: [0,0,0]
    },
    blue: {
      count: 3,
      values: [0,0,0]
    },
    green: {
      count: 3,
      values: [0,0,0]
    }
  });


  /// STEP ACTIONS

  const stepDicePool = () => {
    rollAllDices();
    setActiveStep('reroll');
  }


  /// DICE METHODS

  const addDice = (color, value) => {
    let newDices = { ...dices };

    // Max 10 dices
    if (newDices[color].count === 10) {
      return;
    }

    // Add dice
    ++newDices[color].count;
    if (newDices[color].count > newDices[color].values.length) {
      newDices[color].values.push(value ? value : rollDice());
    }
    setDices(newDices);
  }

  const removeDice = (color) => {
    let newDices = { ...dices };

    // Min 0 dices
    if (newDices[color].count === 0) {
      return;
    }

    --newDices[color].count;

    setDices(newDices);
  }

  const rollAllDices = () => {
    let newDices = { ...dices };

    for (let color in newDices) {
      newDices[color].values = [];
      for (let i = 0; i < newDices[color].count; ++i) {
        newDices[color].values.push( rollDice() );
      }
    }

    setDices(newDices);
  }

  const rollDice = () => {
    return Math.floor(Math.random() * 8) + 1;
  }


  // ------------------------------------

  return (
    <div className="App">
      {activeStep === 'dice-pool' && 
        <DicePool 
          threat={threat} 
          dices={dices} 
          setThreat={setThreat} 
          addDice={addDice} 
          removeDice={removeDice} 
          stepAction={stepDicePool} 
        />
      }
      {activeStep === 'reroll' && 
        <Reroll 
          threat={threat}
          dices={dices}
          setThreat={setThreat} 
          addDice={addDice}
          removeDice={removeDice}
        />
      }
    </div>
  );
}

export default App;
