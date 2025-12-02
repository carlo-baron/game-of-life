"use client";

import {
  useState,
  useEffect
} from 'react';

interface SandCellProps{
  state: boolean;
  row: number;
  col: number;
  canFall: (row, col) => number;
  fall: (row, col) => void;
  onClick: (row, col) => void;
}

export default function SandCell({
  state,
  canFall,
  row,
  col,
  fall,
  onClick,
} : 
  SandCellProps
){
  const [clickCd, setClickCd] = useState<boolean>(false);
  useEffect(() => {
    if(state === 1){
      if(canFall(row, col)){
        setTimeout(() => {
          fall(row, col);
        }, 100);
      }
    }
  },[state]);

  function handleClick(){
    if(clickCd) return;
    onClick(row, col);
    setClickCd(true);

    setTimeout(() => setClickCd(false), 300);
  }

  return(
    <div 
      className="w-[1rem] aspect-1/1 outline-solid outline-white"
      style={{
        background: state ? 'white' : '',
      }}
      onClick={handleClick}
    >
    </div>
  );
}
