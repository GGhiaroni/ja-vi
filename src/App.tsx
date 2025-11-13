import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DetalhesMedia from "./pages/DetalhesMedia";
import Home from "./pages/Home";
import MinhaLista from "./pages/MinhaLista";
import PaginaDeBusca from "./pages/PaginaDeBusca";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="py-8 flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="minhalista" element={<MinhaLista />} />
          <Route
            path="/media/:media_type/:id/:titulo"
            element={<DetalhesMedia />}
          />
          <Route path="/search" element={<PaginaDeBusca />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
