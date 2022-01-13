import { useEffect, useState } from "react";

const Dice = ({ index, value, color, threat, count, selectedDices, rerolledDices, toggleDice }) => {

  /** If true, the dice can be selected */
  const [canSelect, setCanSelect] = useState(index > -1 && rerolledDices.indexOf(index) === -1);

  /** The CSS classes of the dice */
  const [diceClass, setDiceClass] = useState(`dice dice-${color} dice-0`);

  useEffect(() => {
    /**
     * Sets the CSS classes of the dice
     */
    const setClass = () => {
      let newDiceClass = `dice dice-${color} dice-${value}`;

      if (threat > -1 && value >= threat) {
        newDiceClass += ' dice-good';
      }
      if (index > -1 && selectedDices.indexOf(index) > -1) {
        newDiceClass += ' dice-selected';
      }
      if (index > -1 && rerolledDices.indexOf(index) > -1) {
        newDiceClass += ' dice-rerolled';
      }

      setDiceClass(newDiceClass);
    }

    setCanSelect(index > -1 && rerolledDices.indexOf(index) === -1);
    setClass();
  }, [index, value, color, threat, selectedDices, rerolledDices]);

  /**
   * If the dice is selectable, will toggle its selection 
   * @param {string} color blue, red or green
   * @param {number} index Index of the dice
   */
  const handleClick = (color, index) => {
    console.log(canSelect, color, index); 
    if (canSelect) {
      toggleDice(color, index);
    }
  }

  return (
    <span className={diceClass} onClick={() => handleClick(color, index)} >
      {count > -1 && <span className="dice-count">{count}</span>}
      
      <span className="dice-sides">
        <span className="dice-side">8</span>
        <span className="dice-side">5</span>
        <span className="dice-side">4</span>
        <span className="dice-side">1</span>
        <span className="dice-side">7</span>
        <span className="dice-side">6</span>
        <span className="dice-side">3</span>
        <span className="dice-side">2</span>
      </span>
    </span>
  )
}

Dice.defaultProps = {
  index: -1,
  value: 0,
  threat: -1,
  count: -1,
  selectedDices: [],
  rolledDices: [],
  toggleDice: (color, index) => {}
};

export default Dice;