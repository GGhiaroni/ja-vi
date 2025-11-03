import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MinhaLista from "./pages/MinhaLista";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="minhalista" element={<MinhaLista />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
