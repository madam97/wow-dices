import { useState } from "react";

const PopupNumber = ({ min, max, value, setValue, setShowPopup }) => {

  const [tmpValue, setTmpValue] = useState(value);

  const handleClick = (e) => {
    let intTmpValue = parseInt(tmpValue);
    let intMin = parseInt(min);
    let intMax = parseInt(max);

    if (intTmpValue < intMin) {
      setValue(intMin);
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
        <input type="number" min={min} max={max} value={tmpValue} onChange={(e) => setTmpValue(e.target.value)} />
        <button className="btn" onClick={handleClick}>Ok</button>
      </form>
    </div>
  )
}

PopupNumber.defaultProps = {
  min: 1
};

export default PopupNumber;
