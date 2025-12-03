"use client";

import {
  useState,
  useEffect
} from 'react';

interface SandCellProps{
  state: number;
  row: number;
  col: number;
  canFall: (row: number, col: number) => boolean;
  fall: (row: number, col: number) => void;
  onClick: (row: number, col: number) => void;
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
