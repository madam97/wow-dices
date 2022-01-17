import { useEffect, useState } from 'react';
import DiceGroup from '../components/DiceGroup';

type RerollProps = {
  threat: number, 
  reroll: number,
  dices: TDices, 
  stepAction(willChangeActiveStep?: boolean): void, 
  addDice(color: TColor, value?: number): void, 
  removeDice(color: TColor): void, 
  toggleDice(color: string, ind: number): void
};

const Reroll = ({
  threat, 
  reroll, 
  dices, 
  stepAction, 
  addDice, 
  removeDice, 
  toggleDice 
}: RerollProps): JSX.Element => {

  const [canReroll, setCanReroll] = useState<boolean>(true);

  useEffect(() => {
    // Reroll btn is hidden if all of the dices are rerolled
    if (reroll > 0) {
      let countOfDices = 0;
      let countOfRerolledDices = 0;
      let color: TColor;
      for (color in dices) {
        countOfDices += dices[color].count;
        countOfRerolledDices += dices[color].rerolled.length;
      }

      setCanReroll(countOfRerolledDices < countOfDices);
    }
    // Reroll btn is hidden, because there are no more rerolls
    else {
      setCanReroll(false);
    }
  }, [reroll, dices]);


  // ------------------------------------

  let rows: Array<JSX.Element> = [];
  let key: TColor;
  for (key in dices) {
    const color: TColor = key;
    
    rows.push((
      <div key={color} className="row">
        <button 
          className={`row-btn ${dices[color].count === 0 ? 'hidden' : ''}`}
          onClick={() => removeDice(color)}
        >-</button>

        <DiceGroup willShowCount={dices[color].count === 0} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />

        <button
          className={`row-btn ${dices[color].count === 10 ? 'hidden' : ''}`}
          onClick={() => addDice(color)}
        >+</button>
      </div>
    ));
  }

  return (
    <>
      {rows}

      <div className="row row-centered">
        <button className="btn" onClick={() => stepAction(true)}>End</button>
        {canReroll && <button className="btn" onClick={() => stepAction()}>Reroll</button>}
      </div>
    </>
  )
}

export default Reroll;