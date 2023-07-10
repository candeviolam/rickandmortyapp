import { useEffect, useState } from "react";
import { GetCharacters } from "../../services/RickAndMortyService";
import { PacmanLoader } from "react-spinners";

import "./CharactersPage.css";

//el loading es la propiedad que se encarga de mostrarlo o no si esto se está cargando o no -> se lo paso acá y abajo en el <Loader/> p/que su funcionamiento sea complet, pero no es necesario
const Loader = ({ loading }) => {
  return <PacmanLoader color="red" loading={loading} />;
};

export const CharactersPage = () => {
  //     utilizar este characters en el return p/renderizar un componente u otro
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //antes de empezar a cargar los personajes, antes de llamar a la base, vamos a colocar la carga (vamos a empezar a mostrarle al usuario que estamos haciendo una carga)
    setLoading(true);
    //tenemos ya la petición y estamos usando una func p/reutilizar el código
    // acá hice un fetch que me lo lleve al archivo de RickAndMortyService.jsx adentro de la carpeta services
    //usando la función asíncrona creada desde un servicio externo que tratamos acá como una promesa (con el .then y el .catch)
    GetCharacters({ page: 1 })
      //       desestructurar el res que tenía aca y pasarle directam el results que me viene en consola (hacer console.log de results) de la api con destructuring -> desestructurando el obj y poder recibir directam el array (de personajes de la api, en consola)
      .then(({ results }) => {
        //vamos a hacer un setCharacters y guardar los results -> c/v que haga una petición y haya llegado, se van a guardar estos personajes en el estado de mi componente
        setCharacters(results); // hago el console.log de results p/chequear que funcione
        //una vez que los personajes volvieron, que ya me trajo la respuesta (el setCharacters de arriba de éste), vamos a cambiar el loading/la carga a falso -> vamos a terminar con la carga
        setLoading(false);
      })
      //y en caso de que haya error, tmb vamos a cambiar por una carga -> p/q si rompe tmb deje de mostrarse el spinner
      .catch((err) => {
        // el catch acá y en el servicio(?
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    //renderizado condicional
    // que cuando no esté cargando (!loading) ...
    <div className="centered">
      {!loading ? <h1>Hay personajes</h1> : <Loader loading={loading} />}
    </div>
  );
};
