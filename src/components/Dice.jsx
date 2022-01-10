import { useEffect, useState } from "react";

const Dice = ({ index, value, color, threat, selectedDices, rerolledDices, toggleDice }) => {

  const [canSelect, setCanSelect] = useState(index > -1 && rerolledDices.indexOf(index) === -1);
  const [diceClass, setDiceClass] = useState(`dice dice-${color} dice-0`);

  const setClass = () => {
    let newDiceClass = `dice dice-${color} dice-${value}`;

    if (value >= threat) {
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

  useEffect(() => {
    setCanSelect(index > -1 && rerolledDices.indexOf(index) === -1);
    setClass();
  });

  return (
    <span className={diceClass} onClick={(e) => {if (canSelect) toggleDice(color, index)}} >
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
  threat: 8
};

export default Dice;