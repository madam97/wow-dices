import { useState } from 'react';
import DicePool from './steps/DicePool';
import Reroll from './steps/Reroll';
import Resolution from './steps/Resolution';
import Header from './components/Header';
import Background from './assets/images/azeroth.jpg';

function App() {

  const [activeStep, setActiveStep] = useState('dice-pool');
  const [threat, setThreat] = useState(5);
  const [reroll, setReroll] = useState(1);

  const [dices, setDices] = useState({
    red: {
      count: 0,
      values: [],
      selected: [],
      rerolled: []
    },
    blue: {
      count: 0,
      values: [],
      selected: [],
      rerolled: []
    },
    green: {
      count: 0,
      values: [],
      selected: [],
      rerolled: []
    }
  });


  /// STEP ACTIONS

  const stepDicePool = () => {
    rollAllDices();
    setActiveStep('reroll');
  }

  const stepReroll = (willChangeActiveStep = false) => {
    if (willChangeActiveStep) {
      setActiveStep('resolution');
    } else {
      let countOfRerolls = rerollSelectedDices();
      setReroll(reroll - countOfRerolls);
    }
  }

  const stepResolution = () => {
    let newDices = { ...dices };

    for (let color in newDices) {
      for (let i = 0; i < newDices[color].count; ++i) {
        newDices[color].values[i] = 0;
      }
      newDices[color].selected = [];
      newDices[color].rerolled = [];
    }
    
    setDices(newDices);
    setActiveStep('dice-pool');
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
  
  const rerollSelectedDices = () => {
    let newDices = { ...dices };
    
    let countOfRerolls = 0;
    for (let color in newDices) {
      for (let i of newDices[color].selected) {
        if (newDices[color].rerolled.indexOf(i) === -1) {
          newDices[color].values[i] = rollDice();
          newDices[color].rerolled.push(i);
          ++countOfRerolls;
        }
      }

      newDices[color].selected = [];
    }

    setDices(newDices);

    return countOfRerolls;
  }

  const rollDice = () => {
    return Math.floor(Math.random() * 8) + 1;
  }

  /**
   * Select or deselect dice
   * @param {string} color 
   * @param {int} ind 
   */
  const toggleDice = (color, ind) => {
    let newDices = { ...dices };

    // Max 
    let selectedCount = 0;
    for (let color in newDices) {
      selectedCount += newDices[color].selected.length;
    }

    // Select / deselect dice
    let pos = newDices[color].selected.indexOf(ind);

    console.log(color, ind, pos, selectedCount, reroll);

    // Deselect dice
    if (pos > -1) {
      newDices[color].selected.splice(pos, 1);
    } 
    // Select dice if number of selected dices < reroll count
    else if (selectedCount < reroll) {
      newDices[color].selected.push(ind);
    }

    setDices(newDices);
  }


  // ------------------------------------

  return (
    <div className="App">
      <div className="img-bg img-dark">
        <img src={Background} alt="Azeroth map background" />
      </div>

      <div className="step">
        <Header threat={threat} reroll={reroll} setThreat={setThreat} setReroll={setReroll} />

        {activeStep === 'dice-pool' && 
          <DicePool 
            threat={threat} 
            dices={dices} 
            stepAction={stepDicePool} 
            addDice={addDice} 
            removeDice={removeDice} 
            toggleDice={toggleDice}
          />
        }
        {activeStep === 'reroll' && 
          <Reroll 
            threat={threat}
            reroll={reroll}
            dices={dices}
            stepAction={stepReroll} 
            addDice={addDice}
            removeDice={removeDice}
            toggleDice={toggleDice}
          />
        }
        {activeStep === 'resolution' &&
          <Resolution 
            threat={threat} 
            dices={dices}
            stepAction={stepResolution} 
          />
        }
      </div>
    </div>
  );
}

export default App;
