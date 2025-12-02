"use client";

import {
  useState
} from 'react';
import {
  Button
} from '@/components/ui/button';

import SandGrid from "@/components/SandGrid";
import LifeGrid from "@/components/LifeGrid";

export default function Home() {
  const [play, setPlay] = useState<boolean>(false);
  return(
    <div
    className='gap-4 flex flex-col items-center justify-center w-full h-screen'
    >
      <Button
      variant='outline'
      onClick={() => setPlay(!play)}
      >
        {
          play ? "Stop" : "Play"
        }
      </Button>
      <LifeGrid
      size={25}
      play={play}
      />
    </div>
  );
}


