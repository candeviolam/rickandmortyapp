// rafc

import { DataProvider } from "../../context/DataContext";
//       componente que me ofrece react-router-dom que lo llamo abajo en el return
import { Navigate } from "react-router-dom";
//    puedo sacar la importación de React pq no es necesaria x una actualización que hubo
//              p/verificar que el usuario está loggeado -> en éste caso nstro contexto creado está evolviendo todo el BrowserRouter en App.jsx -> todo lo que se encuentre dentro del context (que esté envuelto por el contexto) va a poder acceder al useContext
import { useContext } from "react";

//éste comp de las rutas protegidas va a ser un comp que va a envolver nstras rutas y que va a verificar que el usuario esté loggeado
//si el usuario está loggeado lo va a enviar hacia la pág que quiere ir y sino lo va a enviar a la home page o pág de login, por ej
//como éste comp tiene que envolver el comp o ruta que queremos proteger -> HoC -> va a recibir {children} a través de sus props
//                             necesito recibir hijo p/dibujarlos en el return
export const ProtectedRoute = ({ children }) => {
  //llamamos al contexto
  //    acá a la variable le había puesto "contexto", pero p/evitar tener que hacer por ej contexto.isLogged / contexto.setIsLogged / etc, entonces  para simplifar ese "." hago..
  //    ..destructuring del obj , y acá vamos a obtener el isLogged de nstro provider
  //                          le tenemos que mandar el contextProvider, que en nstro caso se llama DataProvider
  const { isLogged } = useContext(DataProvider); //-> lo que recibe el useContext (el DataProvider) es el proveedor, la variable que se crea a través del createContext() en DataContext.jsx
  //console.log(isLogged);
  //puedo usar ésta lógica de arriba p/retornar algo (por ej que si no estoy loggeado, me devuelva éste div)
  //  si éste isLogged que está arriba, traído del contexto, es falso..
  //   isLogged está en DataContext.jsx
  //si el usuario no está loggeado lo voy a redireccionar a otro lugar
  //cuándo el usuario no esté loggeado lo vamos a devovler a la pág principal
  //                              recibe como parám un atributo que se llama to={} ->en éste to le pasé la home page (/)
  if (!isLogged) return <Navigate to={"/"} />;
  //cuándo el usuario esté loggead, lo mandamos a nstra ruta
  return children;
};

//vamos a utilizar el comp de ProtectedRoute -> lo importamos en App.jsx y envolvemos CharactersPage y CharacterDetailPage
