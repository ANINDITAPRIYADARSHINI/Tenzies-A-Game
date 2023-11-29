import React from 'react';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };
  return (
    <div
      className="h-12 w-12 shadow-md rounded-lg flex justify-center items-center cursor-pointer"
      style={styles}
      onClick={props.holdDice}
    >
      <h2 className="text-base">{props.value}</h2>
    </div>
  );
}
