import { useState } from 'react';
import PopupNumber from './PopupNumber';
import Background from '../assets/images/paper.png';

const Header = ({ threat, reroll, setThreat, setReroll }) => {

  const [showThreatPopup, setShowThreatPopup] = useState(false);
  const [showRerollPopup, setShowRerollPopup] = useState(false);
  
  return (
    <div className="row row-centered row-header">
      <div class="img-bg img-bottom-center">
        <img src={Background} alt="Paper" />
      </div>

      <div>
        <button className="heading heading-value" onClick={() => setShowThreatPopup(true)}>Threat {threat}</button>
        {reroll > -1 && <button className="heading heading-value" onClick={() => setShowRerollPopup(true)}>Reroll {reroll}</button>}
      </div>
      
      {showThreatPopup && <PopupNumber value={threat} max="8" setValue={setThreat} setShowPopup={setShowThreatPopup} />}
      {showRerollPopup && reroll > -1 && <PopupNumber value={reroll} max="30" setValue={setReroll} setShowPopup={setShowRerollPopup} />}
    </div>
  )
}

Header.defaultProps = {
  reroll: -1
};

export default Header;
