import React, { useState, useEffect } from 'react';

// Define la estructura de datos para el capítulo
interface Choice {
  text: string;
  feedback: string;
  nextScene: string;
}

interface Scene {
  text: string;
  choices?: Choice[];
}

interface ChapterData {
  title: string;
  startScene: string;
  scenes: Record<string, Scene>;
}

const GameScene: React.FC = () => {
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [currentSceneKey, setCurrentSceneKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    fetch('/data/capitulo1.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ChapterData) => {
        setChapterData(data);
        setCurrentSceneKey(data.startScene);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar el capítulo:", error);
        setIsLoading(false);
      });
  }, []);

  const handleChoice = (choice: Choice) => {
    if (feedback) return;

    setFeedback(choice.feedback);
    setIsTransitioning(true);

    setTimeout(() => {
      setFeedback('');
      setCurrentSceneKey(choice.nextScene);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 2500);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-center text-gray-500">Cargando historia...</div>;
  }

  if (!chapterData || !currentSceneKey) {
    return <div className="flex items-center justify-center h-screen text-center text-red-500">No se pudo cargar el capítulo.</div>;
  }

  const scene = chapterData.scenes[currentSceneKey];

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-center p-6">
      <div className={`max-w-2xl w-full transition-opacity duration-700 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{chapterData.title}</h2>
        
        <p className="text-lg text-gray-600 mb-8 min-h-[120px] whitespace-pre-line leading-relaxed">
          {scene.text}
        </p>

        {feedback && (
          <div className="my-4 p-4 bg-gray-100 rounded-lg text-gray-700 italic transition-opacity duration-300">
            {feedback}
          </div>
        )}

        {!feedback && scene.choices && (
          <div className="flex flex-col items-center space-y-4 animate-fade-in">
            {scene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice)}
                className="w-full md:w-auto min-w-[280px] py-3 px-6 bg-transparent border-2 border-gray-800 text-gray-800 font-medium rounded-full hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 transition-all duration-300"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

// Pequeña animación de fade-in para los botones
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default GameScene;
