//asíncrona -> hace una petición y devuelve una promesa

//#region CharactersPage

//como esta func se va a encargar de hacer una petición al servidor, la voy a hacer asíncrona p/poder usar la palabra await
//como estamos haciendo con asincronía, no hace falta hacer el .then .then .catch etc, sino que lo hacemos de ésta forma
//                             si voy a get all characters de la documentación, me dice que tengo que pasar un query string que dice page en la url
//                           entonces acá tomo un obj, voy a recibir "page" y le voy a decir que es igual a 1, pq podemos inicializar las variables que recibamos -> en caso de que no me mande el page (que page sea null), page va a ser 1 (? - asignarle un valor por defecto (a los obj que recibimos desde las funciones) así nunca se rompe
//                           {page = 1} //ésto se abre así cuando entro a la pag, pero dsp lo voy modificando según el personaje con la url de abajo que recibe page
//                           a ésto que estaba acá, de page = 1 se lo voy a pasar por el useEffect de CharactersPage.jsx
async function GetCharacters({ page }) {
  //lo envuelvo en un try - catch -> fragmento de código que dice "intenta hacer esto.." (try{}), "si no funciona.. hace el catch del error y logueamelos en la consola" (catch{}) -> es como el .catch de la promesa
  try {
    //                 va a esperar a que fetch responda
    //                                      modifico character y le agrego ésto con interpolación (${}), que está en la url de la documentación, y le pasamos "page" del parámetro de arriba
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    //     como .json() me devuelve una promesa, puedo usar el await
    //estoy haciendo el await mientras lo retorno
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

/* ésta era el fetch que me traje del useEffect de CharactersPage.jsx
fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
*/

//#endregion CharactersPage

//#region CharactersDetailPage

//voy a crear otro servicio que se va a encargar de hacer el fetch que estaba en CharactersDetailPage (abajo está el código como estaba en el otro archivo) en una func asíncrona, envuelto en un try-catch
async function GetCharacterById({ id }) {
  try {
    //       ésto me trae una respuesta que la tengo que convertir a json
    const result = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    //como ésto es una promesa, lo tengo que esperar
    const response = await result.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

/*
fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
*/

//                      lo llamamos (importamos la func) en CharactersDetailPage
export { GetCharacters, GetCharacterById };

//#endregion CharactersDetailPage