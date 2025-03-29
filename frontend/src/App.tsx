import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Auth from "./pages/Auth";

function AppComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
function App() {
  return (
    <Router>
      <AppComponent />
    </Router>
  );
}
export default App;
