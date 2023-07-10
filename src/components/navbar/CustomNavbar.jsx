import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//       NavLink es un comp de react-rou.. con el que vamos a reemplazar los de bootsrap del navbar (Nav.Link) p/por ej cuando navegue por los links del navbar, no se me renderice todo el sitio de nuevo (así no se reinicien y pierda estados, sino que se mantengan)
import { NavLink } from "react-router-dom";

//programando css a través de js (css programado)
//                  : y , porque es un obj
const style = {
  color: "red",
  borderBottom: "1px solid red",
};

//           pregunto si isActive es true, me devuelve el style de la constante de arriba, de lo contrario me devuelve undefined
const ConditionalCSS = ({ isActive }) => {
  //isActive es una propiedad del NavLink -> p/saber si ese link está activo o no (si estoy parada en él o no en la barra de navegación)
  return isActive ? style : undefined;
};

function CustomNavbar() {
  return (
    //              clase de la barra de navegación de bootstrap (nav-link)
    //      NavLink recibe dos props importantes: "to" y "style"(función(?)
    //       el navlink va a tener un prop que se llama to="" -> recibe la url hacia la que va a navegar cuando haga click
    //       los estilos del NavLink de react-rou (style={}).. recibe una función, que en éste caso va a recibir un obj que es una propiedad (? (isActive) --> todo ésto lo saqué y lo hice por aparte en una constante p/usarla en los otros NavLink
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/" style={ConditionalCSS}>
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              to="/characters"
              style={ConditionalCSS}
            >
              Characters
            </NavLink>
            <NavLink className="nav-link" to="/episodes" style={ConditionalCSS}>
              Episodes
            </NavLink>
            <NavLink
              className="nav-link"
              to="/locations"
              style={ConditionalCSS}
            >
              Locations
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
