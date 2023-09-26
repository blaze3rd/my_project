import React, { useState} from 'react';
import { Modal } from 'react-bootstrap';
//import { useNavigate  } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Profile = () =>{
    //let activeUserDetails = localStorage.getItem("userDetails");
    const myObject = JSON.parse(localStorage.getItem('userDetails'));

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /*const detailsClick = (event, message) => {
		//alert(message);
        setShow(true);    
	}*/
    let $id = myObject.id;
    
    const [formData, setFormData] = useState({
        id: $id,
        fname: '',
        lname: '',
        email: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
      };
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Axios request will go here.
        try {
          const response = await axios.post(`http://127.0.0.1:8000/api/updateUser`, formData);
          console.log('Data submitted successfully', response.data);
          localStorage.clear();
          const arr = {
            id: response.data.data.id,
            fname: response.data.data.fname,
            lname: response.data.data.lname,
            email: response.data.data.email,
            verified: response.data.data.email_verified_at
          };
          //setUser(response.data.data.id);
          localStorage.setItem('userDetails', JSON.stringify(arr));
          window.location.reload(false);
          //alert(response.data);
          // Handle successful submission (maybe reset the form or navigate to another page)
      } catch (error) {
          console.error('Error submitting data', error);
          alert(error.response.data.message);
          // Handle the error (maybe show an error message to the user)
      }
      };
    if(myObject){
        
        return(
            
            <Container className='col-sm-6'>
                <h3>User Profile</h3>
                
                <Row className="vh-100 d-flex justify-content-center align-items-center moveTop">
                    <Col md={8} lg={6} xs={12}>
                    <Card className="px-4">
                        <Card.Body>
                        <div className="mb-3 mt-md-4">
                            <h2 className="fw-bold mb-2 text-center text-uppercase ">
                            User Details
                            </h2>
                            <div className="mb-3">
                            <form>
                                <Form.Group className="mb-3" controlId="fName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="fname" value ={myObject.fname} onChange={handleChange}/>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="lName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lname" value ={myObject.lname} onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" name ="email" value={myObject.email} onChange={handleChange}/>
                                </Form.Group>
                                
                            </form>
                            <button type="button" className="btn btn-primary btn-sm" onClick={(handleShow)}>Update Details</button>
                            {/*<button type="button" className="btn btn-danger btn-sm">Verify Email</button>
                            <button type="button" className="btn btn-success btn-sm">Update Password</button> */}
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                
                <Modal show={show} onHide={handleClose}>
                    
                    <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit}>
                    <Modal.Body>
                    <Form.Group className="mb-2" controlId="fname">
                    <Form.Control type="text" placeholder="First Name" name="fname" value ={formData.fname} onChange={handleChange} required="required"/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="lname">
                    <Form.Control type="text" placeholder="Last Name" name="lname" value ={formData.lname} onChange={handleChange} required="required"/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Email Address" name="email" value ={formData.value} onChange={handleChange} required="required"/>
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                    
                    </Modal.Footer>
                    </form>
                </Modal>
                
            </Container>
            
        );
        
    }
    
}

export default Profile;
