import React, { useState } from 'react';

type PopupNumberProps = {
  min?: number, 
  max: number, 
  value: number, 
  setValue(value: number): void, 
  setShowPopup(showPopup: boolean): void 
};

const PopupNumber = ({
  min = 1, 
  max, 
  value, 
  setValue, 
  setShowPopup 
}: PopupNumberProps): JSX.Element => {

  /** The temp value of the popup */
  const [tmpValue, setTmpValue] = useState<number>(value);

  /**
   * Sets the temp value of the popup
   * @param {React.MouseEvent} e 
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (tmpValue < min) {
      setValue(min);
    } else if (tmpValue > max) {
      setValue(max);
    } else {
      setValue(tmpValue);
    }

    setShowPopup(false);
  }

  return (
    <div className="popup">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="number" min={min} max={max} value={tmpValue} onChange={(e) => setTmpValue(parseInt(e.target.value))} />
        <button className="btn" onClick={(e) => handleClick(e)}>Ok</button>
      </form>
    </div>
  )
}

export default PopupNumber;
