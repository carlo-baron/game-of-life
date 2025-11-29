"use client";

import {
  useState,
  useEffect
} from 'react';

export default function Home() {
  return(
    <div
    className='bg-black flex items-center justify-center w-full h-screen'
    >
      <Grid 
      size={10}
      />
    </div>
  );
}

interface CellProps{
  state: boolean;
}

function Grid({size} : {size: number;}){
  const [cells, setCells] = useState<number[][]>([]);
  useEffect(() => {
    const nextCells: number[][] = [];
    for(let i = 0; i < size; i++){
      nextCells[i] = [];
      for(let j = 0; j < size; j++){
        nextCells[i][j] = 0;
      }
    }
    nextCells[0][0] = 1;
    setCells(nextCells);
  }, [size]);

  return(
    <div
    className='gap-1 grid'
    style={{
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gridAutoRows: '1fr',
    }}
    >
      {
        cells.flat().map((cell, index) => <Cell 
                  key={index}
                  state={cell}
                  />)      
      }
    </div>
  );
}

function Cell({state, onDetect} : {state: CellProps; onDetect: () => void}){
  useEffect(() => {},[]);
  return(
    <div 
      className="bg-bluee-500 w-[1rem] aspect-1/1 outline-solid outline-white"
      style={{
        background: state ? 'white' : '',
      }}
    >
    </div>
  );
}
