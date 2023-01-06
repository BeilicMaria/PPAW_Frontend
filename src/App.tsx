import "./App.css";
import { MenuContextProvider } from "./Context/menuContext";
import Router from "./Router/Router";

function App() {
  return (
    <MenuContextProvider>
      <Router />
    </MenuContextProvider>
  );
}

export default App;
