import { useState } from 'react';
import DicePool from './steps/DicePool';
import Reroll from './steps/Reroll';
import Resolution from './steps/Resolution';
import Header from './components/Header';
import Background from './assets/images/azeroth.jpg';
import Character from './steps/Character';

function App() {

  /** The active step: character, dice-pool, reroll, resolution */
  const [activeStep, setActiveStep] = useState('character');

  /** The chosen character */
  const [character, setCharacter] = useState({
    faction: '',
    class: '',
    species: '',
    img: null,
    alt: ''
  });
  
  /** The enemy's threat value, if dice's value >= threat, the dice has good roll */
  const [threat, setThreat] = useState(5);

  /** Number of possible rerolls */
  const [reroll, setReroll] = useState(1);

  /** Red, blue and green dices' count, rolled values, selected and rerolled dices's indexes */
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

  /**
   * Action for the character step
   * @public
   */
  const stepCharacter = () => {
    setActiveStep('dice-pool');
  }

  /**
   * Action for the dice pool step
   * @public
   */
  const stepDicePool = () => {
    rollAllDices();
    setActiveStep('reroll');
  }

  /**
   * Action for the reroll step
   * @param {boolean} willChangeActiveStep If true, will set active step to resolution
   * @public
   */
  const stepReroll = (willChangeActiveStep = false) => {
    if (willChangeActiveStep) {
      setActiveStep('resolution');
    } else {
      let countOfRerolls = rerollSelectedDices();
      setReroll(reroll - countOfRerolls);
    }
  }

  /**
   * Action for the resolution step
   */
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



  /// GAME VALUE METHODS

  /**
   * Sets the threat value (min = 1, max = 8)
   * @param {int} threat 
   */
  const setThreatValue = (threat) => {
    if (threat < 1) {
      threat = 1;
    } else if (threat > 8) {
      threat = 8;
    }

    setThreat(threat);
  }

  /**
   * Sets the reroll value (min = 0, max = 30) and deselect selected dices
   * @param {int} reroll 
   */
  const setRerollValue = (reroll) => {
    // Deselect selected dices
    let newDices = { ...dices };

    for (let color in newDices) {
      newDices[color].selected = [];
    }
    
    setDices(newDices);

    // Change reroll value
    if (reroll < 0) {
      reroll = 0;
    } else if (reroll > 30) {
      reroll = 30;
    }

    setReroll(reroll);
  }


  /// DICE METHODS

  /**
   * Add a new dice of the given color
   * @param {string} color red, blue or green
   * @param {number} value Value of the dice, if it is -1, will set a random value
   * @public
   */
  const addDice = (color, value = -1) => {
    let newDices = { ...dices };

    // Max 10 dices
    if (newDices[color].count < 10) {
      ++newDices[color].count;
      if (newDices[color].count > newDices[color].values.length) {
        newDices[color].values.push(value !== -1 ? value : rollDice());
      }

      setDices(newDices);
    }
  }

  /**
   * Removes the last rolled dice of the given color
   * @param {string} color red, blue or green
   * @public
   */
  const removeDice = (color) => {
    let newDices = { ...dices };

    // Min 0 dices
    if (newDices[color].count > 0) {
      --newDices[color].count;

      setDices(newDices);
    }
  }

  /**
   * Rolls every dices
   */
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
  
  /**
   * Rerolls every selected dices
   * @returns Number of rerolled dices
   */
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

  /**
   * Rolls a dice
   * @returns Random number between 1 and 8
   */
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

      {activeStep === 'character' && 
        <Character 
          character={character}
          stepAction={stepCharacter}
          setCharacter={setCharacter}
        />
      }

      {activeStep !== 'character' && 
        <div className="step">
          <Header 
            character={character} 
            threat={threat} 
            reroll={reroll} 
            setActiveStep={setActiveStep}
            setThreat={setThreatValue} 
            setReroll={setRerollValue} 
          />

          {activeStep === 'dice-pool' && 
            <DicePool 
              character={character}
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
      }
    </div>
  );
}

export default App;
