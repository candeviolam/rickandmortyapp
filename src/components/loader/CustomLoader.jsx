import { PacmanLoader } from "react-spinners";

//el loading es la propiedad que se encarga de mostrarlo o no si esto se está cargando o no -> se lo paso acá y abajo en el <Loader/> p/que su funcionamiento sea complet, pero no es necesario
const CustomLoader = ({ loading }) => {
  return <PacmanLoader color="red" loading={loading} />;
};

export default CustomLoader;
