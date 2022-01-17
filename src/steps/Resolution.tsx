import { useState, useEffect } from 'react';
import DiceGroup from '../components/DiceGroup';
import TokenHit from '../assets/images/token_hit.png';
import TokenDef from '../assets/images/token_def.png';

type ResolutionProps = {
  threat: number, 
  dices: TDices, 
  stepAction(): void,
  toggleDice(color: string, ind: number): void
}

const Resolution = ({
  threat, 
  dices, 
  stepAction,
  toggleDice
}: ResolutionProps): JSX.Element => {

  /** Count of the tokens of the colors: blue, red or green */
  const [tokens, setTokens] = useState<TTokens>({
    red: 0,
    blue: 0,
    green: 0
  });

  useEffect(() => {
    /**
     * Return the count of the tokens of the colors
     * @returns {object}
     */
    const getTokens = (): TTokens => {
      const newTokens: TTokens = {
        red: 0,
        blue: 0,
        green: 0
      };
      let color: TColor;
      for (color in dices) {
        newTokens[color] = 0;
        for (let value of dices[color].values) {
          if (value >= threat) {
            ++newTokens[color];
          }
        }
      }
  
      return newTokens;
    }

    setTokens(getTokens());
  }, [threat, dices]);


  // ------------------------------------

  let rows: Array<JSX.Element> = [];
  let key: TColor;
  for (key in dices) {
    const color: TColor = key;
    
    rows.push((
      <div key={color} className="row row-centered dice-sm-container">
        <div className="row-inner row-inner-fixed">
          <div className={`token token-${color}`}>
            <span>{tokens[color]}</span>
            {color !== 'green' && <img src={TokenHit} alt="Hit token" />}
            {color === 'green' && <img src={TokenDef} alt="Defence token" />}
          </div>
        </div>

        <DiceGroup willGroupDices={true} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />
      </div>
    ));
  }

  return (
    <>
      {rows}

      <div className="row row-centered">
        <button className="btn" onClick={stepAction}>New turn</button>
      </div>
    </>
  )
}

export default Resolution;