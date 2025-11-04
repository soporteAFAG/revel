import React, { useState } from 'react';
import GameScene from '@/components/GameScene';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  // Si el juego ha comenzado, renderiza el componente de la escena del juego.
  if (gameStarted) {
    return <GameScene />;
  }

  // Si no, muestra la pantalla de bienvenida.
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-center p-4">
      <div className="max-w-md">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-800 leading-tight">
          Bienvenido a <span className="font-bold">Revel</span> — tu viaje emocional comienza aquí.
        </h1>
        
        <button
          onClick={() => setGameStarted(true)}
          className="mt-12 py-3 px-8 bg-gray-900 text-white font-medium rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
        >
          Iniciar experiencia
        </button>
      </div>
    </main>
  );
};

export default App;