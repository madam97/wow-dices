import { useState } from 'react';
import PopupNumber from './PopupNumber';
import Background from '../assets/images/paper.png';

const Header = ({ threat, reroll, setThreat, setReroll }) => {

  const [showThreatPopup, setShowThreatPopup] = useState(false);
  const [showRerollPopup, setShowRerollPopup] = useState(false);
  const [lastClientX, setLastClientX] = useState(0);
  
  const handleTouchStart = (clientX) => {
    setLastClientX(clientX);
  }

  const handleTouchMove = (clientX, value, setValue) => {
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
      
      {showThreatPopup && <PopupNumber value={threat} max="8" setValue={setThreat} setShowPopup={setShowThreatPopup} />}
      {showRerollPopup && reroll > -1 && <PopupNumber value={reroll} min="0" max="30" setValue={setReroll} setShowPopup={setShowRerollPopup} />}
    </div>
  )
}

Header.defaultProps = {
  reroll: -1
};

export default Header;
