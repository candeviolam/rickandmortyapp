//p/crear nstro contexto --> el import y los dos export(con el return), eso no cambia, lo que cambia es la info que voy a usar
//              importar una función y un useState(hook)
import { createContext, useState } from "react";

// creamos y exportamos una variable (en éste caso DataProvider)
//           puede tener el nombre que quiera ya que es una variable (una constante)
//                          a ésa variable vamos a ejecutarle la func createContext
//                          ésta func va a devolverme un proveedor que es el que se va a encargar de dibujar el contexto o de funcionar como HoC
export const DataProvider = createContext();
//           DataProvider es la variable que vamos a usar en useContext p/acceder al contexto desde otros comps pq es la que crea la func createContext()

//vamos a crear un componente que tmb vamos a exportar (que se va a llamar como el archivo)
// como este comp es un HoC, va a recibir {children} de prop -> va pasando las props por children
export const DataContext = ({ children }) => {
  //creamos una variable
  const [isLogged, setIsLogged] = useState(false);
  //p/ejemplificar únicamente
  const [mensaje, setMensaje] = useState("Hola soy el contexto");

  //necesito decirle a nstro proveedor del return que los datos iniciales van a ser los del useState, p/eso vamos a crear una func(? que va a ser un obj({}) que va a tener los valores del useState -> no necesito los ":" en el obj pq voy a usar el mismo nombre, pero si quisiera cambiarles el nombre a las variables pordría hacer..
  //logged: isLogged,
  //funcionLogged: setIsLogged,
  const initialValues = {
    isLogged,
    setIsLogged,
    //p/ejemplificar únicamente
    mensaje,
    setMensaje,
  };

  //va a retornar éste DataProvider que hemos creado en la variable de arriba y envolver los children/hijos (que son comps) dentro de un DataProvider
  //              Provider es una propiedad que se va a encargar de funcionar como proveedor de todo el estado de nstra aplic
  // si me acerco al comp DataProvider de la variable voy a ver que es un React.Context, y el contexto siempre tiene un Provider que es otro comp que funciona como proveedor de toda la aplic (por eso el .Provider)
  //                       le agrego un atributo/prop que se llama value que es valor inicial que va a tener nstra aplic cuando se crea el contexto, que va a ser el valor de la variable que creamos con los valores del useState
  //                              de ésta forma, cuando mi aplic se genere, el valor inicial siempre va a ser false de isLogged (del useState), y voy a tener acceso a la func (setIsLogged) p/modificar su valor y que eso se vea en todos lados
  //caja que envuelve toda la aplicación (envolviendo todo en App.jsx)
  return (    
    //                            ésto (con la variable isLogged y la func setIsLogged por ej) ahora está en el contexto, cualq comp que quiera acceder a ésto puede siempre que ése comp se encuentre adentro del provider (los que están en App.jsx que acá serían los {children})
    <DataProvider.Provider value={initialValues}>
      {children}
    </DataProvider.Provider>
  );
};

//ahora tenemos que utilizar nstro contexto (el comp DataContext), llamarlo desde donde tendríamos que llamarlo, p/eso vamos a ir hasta el App.jsx -> como nstro contexto es un HoC, podemos llamarlo p/que envuelva toda nstra aplic

//puedo tener más de un contexto en mi aplic, incluso uno que no envuelva todo sino sólo unos cuantos componentes 

// ejemplo de como acceder al contexto desde CharactersDetailPage y CharactersPage