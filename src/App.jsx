//      tres componentes que utilizo abajo en el return de App()
//                      Routes adentro recibe como children una lista de rutas, que las voy a declarar como Route
//                              Route tiene una prop que se llama path="" -> con ésto estoy configurando cual es la direcc a la que podemos acceder --> la ruta siempre empieza con una / y dsp como  quiera llamarla
//                              Route tiene un elemento/otra prop que se llama element={} -> ese elemnt es un html/un componente, puedo pasarle etiquetas html por dentro --> el elemento que recibe la ruta es un componente de react, el componente que quiero mostrar cuando acceda a la ruta/comp que la ruta va a renderizar
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterDetailPage from "./pages/characters-detail";
import CustomNavbar from "./components/navbar";
import CharactersPage from "./pages/characters";
import { DataContext } from "./context/DataContext";

//ésto va a ser un componente de react (por más de que parezcan variables) -> si me apoyo en HomePage por ej, me dice que es un JSX.Element, que significa que es un comp.
//es una func de flecha el HomePage (?
//los comps son funciones
const HomePage = () => {
  return <h1>Hola Home Page Componente</h1>;
};

const LocationsPage = () => {
  return <h1>Hola Locations Page</h1>;
};

const EpisodesPage = () => {
  return <h1>Hola Episodes Page</h1>;
};

function App() {
  return (
    //                la / sola de path hace referencia a la home page -> mostrar el componente de la pág ppal
    //                                                    puedo poner simplem el tag de cierre en Route, no hace falta abrirla y cerrarla con dos etiquetas como a las otras (Routes y BrowserRouter) (jsx nos da esa posibilidad)
    //                             puedo enviarle la HomePage como un elemento interno/un componente -> página compactada porque lo paso como componente
    //       cada ruta va a renderizar una página diferente
    //                            /:id -> ruta del detalle, p/poder acceder al detalle del personaje
    //                            /:id -> la ruta p/entrar a la pág del detalle del personaje va a ser /characters/"algo", no le estoy especificando que quiero que me envíe un id, si yo pongo cualq cosa dsp de /characters/ en el navegador del sitio, me va a llevar a una pág con el msj de "Hola Detalle Personajes"
    //                            los ":" sirven p/que le indique a la ruta cómo se va a llamar lo que le voy a enviar dsp de la barra diagonal (ej: id, nombre, etc)
    //                            le estoy indicando que ésta propiedad que le voy a mandar pasada la barra diagonal se va a llamar id -> la recibo con el hook useParams en la pág del detalle del personaje, donde importo useParams
    //  en navbar puede ir dentro del browser, p/q aparezca en todo mi sitio/en todas las rutas (pero no de routes porque ahí adentro siempre van rutas)

    //como nstro contexto es un HoC, podemos llamarlo p/q envuelva toda nstra aplic -> llamamos a DataContext, la importamos
    //todos los children que está envolviendo mi contexto (BrowsRou, Rou, Custom..) se van a dibujar, pq los estoy dibujando {children} en DataContext.jsx en el return envuelto por DataProvider.Provider 
    <DataContext>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
        </Routes>
      </BrowserRouter>
    </DataContext>
  );
}

// ejemplo de como acceder al contexto desde CharactersDetailPage y CharactersPage

export default App;
