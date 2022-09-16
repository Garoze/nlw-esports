import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameCard } from './components/GameCard';
import { CreateAdBanner } from './components/CreateAdBanner';

import logoImg from './assets/logo-nlw-esports.svg';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game {
  id: string;    
  title: string;
  bannerUrl: string;
  _count: {
      ads: number;
    }
}

function App() {
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then((response) => setGamesList(response.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="nlw esports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {gamesList.map((game) => ( 
          <GameCard 
            key={game.id} 
            title={game.title} 
            bannerUrl={game.bannerUrl} 
            adsCount={game._count.ads}
          />
        ))}
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
