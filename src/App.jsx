import GameBoard from './assets/components/GameBoard';

function App() {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center bg-slate-700">
        <h1 className="text-xl font-bold text-white">2048</h1>
        <GameBoard />
      </div>
    </>
  );
}

export default App;
