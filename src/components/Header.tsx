import { useState } from 'react';
import PopupNumber from './PopupNumber';
import Background from '../assets/images/paper.png';

type HeaderProps = { 
  character: TCharacter, 
  threat: number, 
  reroll?: number, 
  setActiveStep(activeStep: TStep): void, 
  setThreat(threat: number): void, 
  setReroll(reroll: number): void 
};

const Header = ({ 
  character, 
  threat, 
  reroll = -1, 
  setActiveStep, 
  setThreat, 
  setReroll
}: HeaderProps): JSX.Element => {

  /** If true, popup to set threat is seen */
  const [showThreatPopup, setShowThreatPopup] = useState<boolean>(false);

  /** If true, popup to set reroll is seen */
  const [showRerollPopup, setShowRerollPopup] = useState<boolean>(false);

  /** The X coordinate of the last touch event */
  const [lastClientX, setLastClientX] = useState<number>(0);
  
  /**
   * Saves the X coord of the last touch event
   * @param {number} clientX 
   */
  const handleTouchStart = (clientX: number): void => {
    setLastClientX(clientX);
  }

  /**
   * Increases or decreases the value of the given value (threat, reroll)
   * @param {number} clientX 
   * @param {number} value 
   * @param {function} setValue 
   */
  const handleTouchMove = (clientX: number, value: number, setValue: {(value: number): void}): void => {
    let diff = clientX - lastClientX;

    if (Math.abs(diff) >= 30) {
      // Left swipe
      if (diff < 0) {
        setValue(value - 1);
      }
      // Right swipe
      else {
        setValue(value + 1);
      }
      
      setLastClientX(clientX);
    }
  }
  
  return (
    <div className="row row-centered row-header">
      <div className="img-bg img-bottom-center">
        <img src={Background} alt="Paper" />
      </div>

      <img
        className={`img-char border-${character.faction}`}
        src={character.img}
        alt={character.alt}
        onClick={() => setActiveStep('character')}
      />

      <div>
        <button 
          className="heading-value" 
          onClick={() => setShowThreatPopup(true)}
          onTouchStart={(e) => handleTouchStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => handleTouchMove(e.targetTouches[0].clientX, threat, setThreat)}
        >
          Threat {threat}
        </button>

        {reroll > -1 && 
          <button 
            className="heading-value" 
            onClick={() => setShowRerollPopup(true)}
            onTouchStart={(e) => handleTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => handleTouchMove(e.targetTouches[0].clientX, reroll, setReroll)}
          >
            Reroll {reroll}
          </button>
        }
      </div>
      
      {showThreatPopup && <PopupNumber value={threat} max={8} setValue={setThreat} setShowPopup={setShowThreatPopup} />}
      {showRerollPopup && reroll > -1 && <PopupNumber value={reroll} min={0} max={30} setValue={setReroll} setShowPopup={setShowRerollPopup} />}
    </div>
  )
}

export default Header;
