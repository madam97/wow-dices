import { useEffect, useState } from 'react';
import DiceGroup from '../components/DiceGroup';
import { texts } from '../data/character';

type DicePoolProps = {
  character: TCharacter, 
  threat: number, 
  dices: TDices, 
  stepAction(): void, 
  addDice(color: TColor, value: number): void, 
  removeDice(color: TColor): void, 
  toggleDice(color: string, ind: number): void
}

export default function DicePool({
  character, 
  threat, 
  dices, 
  stepAction, 
  addDice, 
  removeDice, 
  toggleDice
}: DicePoolProps): JSX.Element {

  /** The selected row's color: blue, red or green */
  const [selectedRow, setSelectedRow] = useState<TColor | null>(null);

  /** The X coordinate of the last touch event */
  const [lastClientX, setLastClientX] = useState<number>(0);

  /** The step's button text */
  const [btnText, setBtnText] = useState<string>();

  useEffect(() => {
    /**
     * Returns the randomized dice pool step btn text
     * @returns {string}
     */
    const getBtnText = (): string => {
      let text = '';
      let ind = Math.floor(
        Math.random() * (
          texts.class[character.class].length + 
          texts.faction[character.faction].length + 
          texts.species[character.species].length
        )
      );

      // Class text
      if (ind < texts.class[character.class].length) {
        text = texts.class[character.class][ind];
      }
      // Faction text
      else if (ind - texts.class[character.class].length < texts.faction[character.faction].length) {
        text = texts.faction[character.faction][ ind - texts.class[character.class].length ];
      }
      // Species text
      else {
        text = texts.species[character.species][ ind - texts.class[character.class].length - texts.faction[character.faction].length ];
      }
  
      return text;
    }
  
    setBtnText(getBtnText());
  }, [character]);

  /**
   * Saves the X coord of the last touch event
   * @param {number} clientX 
   */
  const handleTouchStart = (clientX: number): void => {
    setLastClientX(clientX);
  }

  /**
   * Adds or removes a dice based on the X coord of the last touch event
   * @param {number} clientX 
   * @param {color} color blue, red or green
   */
  const handleTouchMove = (clientX: number, color: TColor): void => {
    let diff = clientX - lastClientX;

    if (Math.abs(diff) >= 30) {
      // Left swipe
      if (diff < 0) {
        removeDice(color);
      }
      // Right swipe
      else {
        addDice(color, 0);
      }
      
      setLastClientX(clientX);
    }

    setSelectedRow(color);
  }

  /**
   * Removes the selected row's color after the touch event ends
   */
  const handleTouchEnd = (): void => {
    setSelectedRow(null);
  }


  // ------------------------------------

  let rows: Array<JSX.Element> = [];
  let key: TColor;
  for (key in dices) {
    const color: TColor = key;

    rows.push((
      <div 
        key={color} 
        className={`row ${selectedRow === color ? 'row-selected' : ''}`}
        onTouchStart={(e) => handleTouchStart(e.changedTouches[0].clientX)}
        onTouchMove={(e) => handleTouchMove(e.changedTouches[0].clientX, color)}
        onTouchEnd={() => handleTouchEnd()}
      >
        <button 
          className={`row-btn ${dices[color].count === 0 ? 'hidden' : ''}`}
          onClick={() => removeDice(color)}
        >-</button>
        
        <DiceGroup willShowCount={true} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />

        <button 
          className={`row-btn ${dices[color].count === 10 ? 'hidden' : ''}`}
          onClick={() => addDice(color, 0)}
        >+</button>
      </div>
    ));
  }

  return (
    <>
      {rows}

      {dices.red.count + dices.blue.count + dices.green.count > 0 && 
        <div className="row row-centered">
          <button className="btn" onClick={stepAction}>{btnText}</button>
        </div>
      }
    </>
  )
}
