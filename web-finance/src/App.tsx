import { useState } from "react";

function App() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <main className="bg-slate-800 text-white min-w-screen min-h-screen relative flex flex-col items-center justify-center">
      <div className={`fixed bg-black bg-opacity-10 flex items-center justify-center transition-opacity duration-300 ${isOpenModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className={`bg-white text-black p-6 rounded-lg shadow-lg transition-transform duration-300 ${isOpenModal ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
          <button
            className="absolute top-3 right-3 text-2xl cursor-pointer"
            onClick={handleOpenModal}
          >
            X
          </button>
          <h1 className="text-4xl font-bold">Web Finance</h1>
          <p className="text-2xl">Una aplicación web para gestionar tus finanzas</p>
        </div>
      </div>

      {!isOpenModal && (
        <button
          className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={handleOpenModal}
        >
          Agregar transacción
        </button>
      )}

    </main>
  );
}

export default App;
