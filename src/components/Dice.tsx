import { useEffect, useState } from "react";

type DiceProps = {
  index?: number,
  value?: number,
  color: TColor,
  threat?: number,
  count?: number,
  selectedDices?: Array<number>,
  rerolledDices?: Array<number>,
  toggleDice(color: string, ind: number): void
};

const Dice = ({ 
  index = -1, 
  value = 0, 
  color, 
  threat = -1, 
  count = -1, 
  selectedDices = [], 
  rerolledDices = [], 
  toggleDice 
}: DiceProps): JSX.Element => {

  /** If true, the dice can be selected */
  const [canSelect, setCanSelect] = useState<boolean>(index > -1 && rerolledDices.indexOf(index) === -1);

  /** The CSS classes of the dice */
  const [diceClass, setDiceClass] = useState<string>(`dice dice-${color} dice-0`);

  useEffect(() => {
    /**
     * Sets the CSS classes of the dice
     */
    const setClass = (): void => {
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
  const handleClick = (color: string, index: number): void => {
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

export default Dice;