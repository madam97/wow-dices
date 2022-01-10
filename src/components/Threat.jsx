import { useState } from "react";
import PopupNumber from "./PopupNumber";

export default function Threat({ threat, setThreat }) {

  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <div className="row row-centered">
      <button className="heading heading-value" onClick={() => setShowPopup(true)}>Threat {threat}</button>

      {showPopup && <PopupNumber value={threat} max="8" setValue={setThreat} setShowPopup={setShowPopup} />}
    </div>
  )
}