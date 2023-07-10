import { useEffect } from "react";
//       hook de react-router-dom -> p/recibir los parámetros de la ruta(? 
import { useParams } from "react-router-dom";

export const CharacterDetailPage = () => {
  //    params -> corresponde en éste caso a "id" de abajo en el path, por eso puedo hacerle destructurtig y obtenerlo directam como id
  //             lo llamo p/recibir los parámetros de la ruta(?
  //    me devuelve (el useParams(?) un obj con una propiedad que se llama "id", que es el valor de lo que le voy a estar enviando luego de la barra diagonal /
  const { id } = useParams(); //useParams me devuelve el obj que enviamos por params

  //p/hacer una petición al servidor -> usamos el id p/hacer la petición a la api
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }, []); //no necesita dependencia en éste caso

  return <h1>Hola Detalle Personajes</h1>;
};
