import { useEffect, useState } from "react";

const Dice = ({ value, color }) => {

  const [diceClass, setDiceClass] = useState(`dice dice-${color} dice-0`);

  useEffect(() => {
    setDiceClass(`dice dice-${color} dice-${value}`);
  }, []);

  return (
    <span className={diceClass}>
      <span className="dice-side">8</span>
      <span className="dice-side">5</span>
      <span className="dice-side">4</span>
      <span className="dice-side">1</span>
      <span className="dice-side">7</span>
      <span className="dice-side">6</span>
      <span className="dice-side">3</span>
      <span className="dice-side">2</span>
    </span>
  )
}

Dice.defaultProps = {
  value: 0
};

export default Dice;