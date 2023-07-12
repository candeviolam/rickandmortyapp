import CustomLoader from "../../components/loader/CustomLoader";
import { GetCharacterById } from "../../services/RickAndMortyService";
//                  importamos ahora si el useState que nos estaba faltando
import { useEffect, useState } from "react";
//       hook de react-router-dom -> p/recibir los parámetros de la ruta(?
import { NavLink, useParams } from "react-router-dom";

import "./CharacterDetail.css";

export const CharacterDetailPage = () => {
  //    params -> corresponde en éste caso a "id" de abajo en el path, por eso puedo hacerle destructurtig y obtenerlo directam como id
  //             lo llamo p/recibir los parámetros de la ruta(?
  //    me devuelve (el useParams(?) un obj con una propiedad que se llama "id", que es el valor de lo que le voy a estar enviando luego de la barra diagonal /
  const { id } = useParams(); //useParams me devuelve el obj que enviamos por params
  //traemos los estados de CharactersPage(?
  //                                         useState inicializado como obj vacío
  const [character, setCharacter] = useState({});
  const [loader, setLoader] = useState(false);

  //p/hacer una petición al servidor -> usamos el id p/hacer la petición a la api
  useEffect(() => {
    setLoader(true); // p/que se cargue como hacía con los personajes en CharactersPage
    //el fetch que teníamos acá, movido a services, solo dejo un .then y el .catch (? -> lo extraje a un servicio externo
    //importamos la func desde el servicio, con el id(?
    GetCharacterById({ id })
      //una vez que se terminó y volvió el resultado , setLoader en false
      .then((result) => {
        setCharacter(result); //estamos almacenando el valor del personaje una vez que se terminó de cargar y volvemos a pasar el loader a false
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []); //acá adentro estamos llamando al setLoader ahora, y debería ponerle la dependencia del loader (de arriba del useState) acá adentro p/q funcione correctamente -> pero le paso el array vacío pq no quiero que se cargue de nuevo el componente

  //ya me trae el detalle del personaje, como ya hice el character arriba (useState) puedo llamarle la imagen
  return (
    //vamos a hacer de nuevo el renderizado condicional
    //vamos a preguntar si éso está cargando, y si está cargando ponemos el CustomLoader
    // una vez que terminó de cargar, asumo que volvió la info del servidor y puedo mostrarla (con el name y la image en este caso)
    //agrego {} envolviendo todo dentro del div p/poder agregar lógica adentro
    <div className="character-container">
      {loader ? (
        <CustomLoader loading={loader} />
      ) : (
        <section>
          <img src={character.image} />
          <h3>{character.name}</h3>
          <NavLink to="/characters" className="btn btn-dark">
            Volver
          </NavLink>
        </section>
      )}
    </div>
  );
};
