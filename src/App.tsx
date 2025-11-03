import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen flex justify-center">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="minhalista" element={<MinhaLista />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
