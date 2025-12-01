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

  function neighbors(row: number, col: number) {
    const dirs = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ];

    const neighborCells: number[] = [];

    for (const [dr, dc] of dirs) {
      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < cells.length && c >= 0 && c < cells[0].length) {
        neighborCells.push(cells[r][c]);
      } else {
        neighborCells.push(null);
      }
    }

    return neighborCells;
  }

  function getNeighbor(row, col){
    const neighborCells = neighbors(row, col);
    return neighborCells.filter(neighbor => neighbor === 1).length;
  }

  function canFall(row, col){
    return neighbors(row, col)[4] === 0;
  }

  function fall(row, col){
    const nextCells = [...cells];
    nextCells[row][col] = 0;
    nextCells[row+1][col] = 1;
    setCells(nextCells);
  }

  return(
    <div
    className='gap-1 grid'
    style={{
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gridAutoRows: '1fr',
    }}
    >
      {
        cells.flat().map((cell, index) => {
          const row = Math.floor(index / size);
          const col = index % size;

          return(
            <Cell 
            key={index}
            row={row}
            col={col}
            state={cell}
            canFall={canFall}
            fall={fall}
            />
          );
        })
      }
    </div>
  );
}

function Cell({
  state,
  canFall,
  row,
  col,
  fall,
} : 
  {
  state: CellProps;
  row: number;
  col: number;
  canFall: (row, col) => number;
  fall: (row, col) => void;
}){
  useEffect(() => {
    if(state === 1){
      console.log(row, col);
      if(canFall(row, col)){
        setTimeout(() => {
          fall(row, col);
        }, 100);
      }
    }
  },[state]);

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
