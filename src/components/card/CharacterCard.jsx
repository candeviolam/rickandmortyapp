import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { NavLink } from "react-bootstrap";

//creamos otro componente, el comp card (traído de react bootstrap)
//      importamos NavLink (era un button en react-boots) ---> usa clase de bootstrap, ej el btn btn-primary
//              como es un obj el del to=.. va entre {} ; y en el ${} tenemos que pasarle el id, que vamos a recibirlo en la func como {character} -> que lo vamos a usar para renderizar lo que queremos ver
const CharacterCard = ({ character }) => {
  //    recibo con destructuring la imagen del personaje y dsp la uso en la tarjeta. (el image, id, status, etc, todo eso está en la documentación de la api, ahí veo la estructura del obj que estoy queriendo traer y uso sus propiedades como aparecen en la documentación acá en la tarjeta)
  const { image, id, name, gender, species, status } = character;
  //                              acá no hace falta poner el character.image pq para eso lo saqué en una variable arriba
  //           as={} -> prop de NavLink
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {gender}
          <br />
          {species}
          <br />
          {status}
        </Card.Text>
        <NavLink as={Link} to={`/characters/${id}`} className="btn btn-dark">
          Detalle
        </NavLink>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
