import { useState, useEffect } from 'react';
import DiceGroup from '../components/DiceGroup';
import TokenHit from '../assets/images/token_hit.png';
import TokenDef from '../assets/images/token_def.png';

export default function Resolution({ threat, dices, stepAction}) {

  /** Count of the tokens of the colors: red, blue or green */
  const [tokens, setTokens] = useState({
    red: 0,
    blue: 0,
    green: 0
  });

  useEffect(() => {
    /**
     * Return the count of the tokens of the colors
     * @returns {object}
     */
    const getTokens = () => {
      const newTokens = {};
  
      Object.keys(dices).forEach((color) => {
        newTokens[color] = 0;
        for (let value of dices[color].values) {
          if (value >= threat) {
            ++newTokens[color];
          }
        }
      });
  
      return newTokens;
    }

    setTokens(getTokens());
  }, [threat, dices]);


  return (
    <>
      {Object.keys(dices).map((color) => (
        <div key={color} className="row row-centered dice-sm-container">
          <div className="row-inner row-inner-fixed">
            <div className={`token token-${color}`}>
              <span>{tokens[color]}</span>
              {color !== 'green' && <img src={TokenHit} alt="Hit token" />}
              {color === 'green' && <img src={TokenDef} alt="Defence token" />}
            </div>
          </div>

          <DiceGroup willGroupDices={true} dices={dices[color]} color={color} threat={threat} />
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn" onClick={stepAction}>New turn</button>
      </div>
    </>
  )
}
