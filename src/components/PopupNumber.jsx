import { useState } from "react";

export default function PopupNumber({ max, value, setValue, setShowPopup }) {

  const [tmpValue, setTmpValue] = useState(value);

  const handleClick = (e) => {
    let intTmpValue = parseInt(tmpValue);
    let intMax = parseInt(max);

    if (intTmpValue < 1) {
      setValue(1);
    } else if (intTmpValue > intMax) {
      setValue(intMax);
    } else {
      setValue(intTmpValue);
    }

    setShowPopup(false);
  }

  return (
    <div className="popup">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="number" min="1" max={max} value={tmpValue} onChange={(e) => setTmpValue(e.target.value)} />
        <button className="btn" onClick={handleClick}>Ok</button>
      </form>
    </div>
  )
}
