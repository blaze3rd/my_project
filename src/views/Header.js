import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
//import Home from '../views/Home';

function Header(){
  
  const nav = useNavigate();
  let activeId = localStorage.getItem("userDetails");
  //const [userId, setUserId] = useState();
  console.log(activeId);

  const handleLogout = () => {
    //setUserName({});
    //setUserId({});
    localStorage.clear();
    nav("/");
    window.location.reload(false);
  };

  if(activeId){
    return(
      <div>
      <Navbar className="bg-body-tertiary">
      <Container>
        <Link to="/">Home</Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end urlCss">
            
        <Link to="/user">My Account</Link>&nbsp;&nbsp;&nbsp;
        <Link onClick={handleLogout}>Logout</Link>

        </Navbar.Collapse>
      </Container>
      </Navbar>
    </div>
    ); 
  }
  return (
      <div>
        <Navbar className="bg-body-tertiary">
        <Container>
        <Link to="/">Home</Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end urlCss">
              
              <Link to="/login">Login</Link>
              <Link to="/registration">Register</Link>

          </Navbar.Collapse>
        </Container>
        </Navbar>
      </div>
    );
}
export default Header;