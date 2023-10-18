import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape";
import { Outlet } from "react-router-dom";
import "./App.scss";

export default function App() {
  //Lista de links redes sociais

  return (
    <>
      <div className="container">
        <Cabecalho />
          <Outlet />
        <Rodape/>
      </div>
    </>
  );
}
