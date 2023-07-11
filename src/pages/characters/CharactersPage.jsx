import CharacterCard from "../../components/card/CharacterCard";
import CustomLoader from "../../components/loader/CustomLoader";
import { GetCharacters } from "../../services/RickAndMortyService";
import { useEffect, useState } from "react";

import "./CharactersPage.css";

export const CharactersPage = () => {
  //     utilizar este characters en el return p/renderizar un componente u otro
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // abajo en el div, una vez que se hayan renderizado mis personajes, vamos a devolver otro div más..

  useEffect(() => {
    //antes de empezar a cargar los personajes, antes de llamar a la base, vamos a colocar la carga (vamos a empezar a mostrarle al usuario que estamos haciendo una carga)
    setLoading(true);
    //tenemos ya la petición y estamos usando una func p/reutilizar el código
    // acá hice un fetch que me lo lleve al archivo de RickAndMortyService.jsx adentro de la carpeta services
    //usando la función asíncrona creada desde un servicio externo que tratamos acá como una promesa (con el .then y el .catch)
    //              acá simplemente paso page (sin el :1 que tenía )
    GetCharacters({ page })
      //       desestructurar el res que tenía aca y pasarle directam el results que me viene en consola (hacer console.log de results) de la api con destructuring -> desestructurando el obj y poder recibir directam el array (de personajes de la api, en consola)
      .then(({ results }) => {
        //hacemos el setTimeOut y le pasamos los 2segs al final, para forzar que aparezca ese tiempito el spinner
        setTimeout(() => {
          //vamos a hacer un setCharacters y guardar los results -> c/v que haga una petición y haya llegado, se van a guardar estos personajes en el estado de mi componente
          setCharacters(results); // hago el console.log de results p/chequear que funcione
          //una vez que los personajes volvieron, que ya me trajo la respuesta (el setCharacters de arriba de éste), vamos a cambiar el loading/la carga a falso -> vamos a terminar con la carga
          setLoading(false);
        }, 1000); // como estoy adentro de una promesa, el sist ya se va a encargar de esperar(?
      })
      //y en caso de que haya error, tmb vamos a cambiar por una carga -> p/q si rompe tmb deje de mostrarse el spinner
      .catch((err) => {
        // el catch acá y en el servicio(?
        console.log(err);
        setLoading(false);
      });
  }, [page]); //paso las dependencias necesarias, pq quiero que cuando page cambie (botones de prev y next) se ejecute de nuevo el método
  //  cuando cambie page, el efecto se vuelve a ejecutar entero

  return (
    //renderizado condicional
    // que cuando no esté cargando (!loading) ...
    //una vez que tenga personajes (el characters, setCharacters y etc), vamos a hacer un forEach(? p/dibujar los personajes
    // vamos a retornar otro div que sea el encargado de recibir las tarjetas
    //             ahora vamos a llamar a CharacterCard, que recibe como parámetro un personaje, entonces le vamos a pasar character y le vamos a pasar el character (character={character}); y tmb le tengo que pasar una key, que hace referencia a el index
    //tengo esta {} (la que envuelve el !load..) que indica que adentro voy a poner código de js, como adentro estoy colocando el div, p/poder agregar lógica si o si tengo que colocar de nuevo las llaves {}
    //       characters del useState de arriba, adentro recibo el personaje (de las tarjetas(?) y el index
    <div className="centered">
      {!loading ? (
        <div className="container-fluid contenedor-tarjs-but">
          <div className="contenedor-tarjetas">
            {characters.map((character, index) => {
              return <CharacterCard character={character} key={index} />;
            })}
          </div>
          <div className="controls">
            <button onClick={() => setPage(page - 1)} className="btn btn-dark">
              Previous
            </button>
            <button onClick={() => setPage(page + 1)} className="btn btn-dark">
              Next
            </button>
          </div>
        </div>
      ) : (
        <CustomLoader loading={loading} />
      )}
    </div>
    //   agregamos otro div dentro de el div de contendor de tarjetas, con botones, para hacer el paginado con el useState de arriba
  );
};
