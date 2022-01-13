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
    name: '',
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
    blue: {
      count: 0,
      values: [],
      selected: [],
      rerolled: []
    },
    red: {
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
    for (const color in dices) {
      setDices((prevDices) => ({
        ...prevDices,
        [color]: {
          ...prevDices[color],
          values: new Array(prevDices[color].count).fill(0),
          selected: [],
          rerolled: []
        }
      }));
    }
    
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
    for (const color in dices) {
      setDices((prevDices) => ({
        ...prevDices,
        [color]: {
          ...prevDices[color],
          selected: []
        }
      }));
    }

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
   * @param {string} color blue, red or green
   * @param {number} value Value of the dice, if it is -1, will set a random value
   * @public
   */
  const addDice = (color, value = -1) => {
    // Max 10 dices
    if (dices[color].count < 10) {
      const count = dices[color].count + 1;
      const values = dices[color].values.slice();

      if (count > values.length) {
        values.push(value !== -1 ? value : rollDice());
      }

      setDices((prevDices) => ({
        ...prevDices,
        [color]: {
          ...prevDices[color],
          count,
          values
        }
      }));
    }
  }

  /**
   * Removes the last rolled dice of the given color
   * @param {string} color blue, red or green
   * @public
   */
  const removeDice = (color) => {
    // Min 0 dices
    if (dices[color].count > 0) {
      const count = dices[color].count - 1;

      setDices((prevDices) => ({
        ...prevDices,
        [color]: {
          ...prevDices[color],
          count
        }
      }));
    }
  }

  /**
   * Rolls every dices
   */
  const rollAllDices = () => {
    for (const color in dices) {
      const values = [];

      for (let i = 0; i < dices[color].count; ++i) {
        values.push( rollDice() );
      }

      setDices((prevDices) => ({
        ...prevDices,
        [color]: {
          ...prevDices[color],
          values
        }
      }));
    }
  }
  
  /**
   * Rerolls every selected dices
   * @returns Number of rerolled dices
   */
  const rerollSelectedDices = () => {
    let countOfRerolls = 0;

    for (const color in dices) {
      if (dices[color].selected.length > 0) {
        const values = dices[color].values.slice();
        const rerolled = dices[color].rerolled.slice();

        for (const i of dices[color].selected) {
          if (rerolled.indexOf(i) === -1) {
            values[i] = rollDice();
            rerolled.push(i);
            ++countOfRerolls;
          }
        }

        setDices((prevDices) => ({
          ...prevDices,
          [color]: {
            ...prevDices[color],
            values,
            selected: [],
            rerolled
          }
        }));
      }
    }

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
    const selected = dices[color].selected.slice();

    // Max 
    let selectedCount = 0;
    for (let color in dices) {
      selectedCount += dices[color].selected.length;
    }

    // Select / deselect dice
    let pos = selected.indexOf(ind);

    // Deselect dice
    if (pos > -1) {
      selected.splice(pos, 1);
    } 
    // Select dice if number of selected dices < reroll count
    else if (selectedCount < reroll) {
      selected.push(ind);
    }

    setDices((prevDices) => ({
      ...prevDices,
      [color]: {
        ...prevDices[color],
        selected,
      }
    }));
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
