import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';




  const Registration = () =>{

  const nav = useNavigate();
  //const [userId, setUser] = useState();
  const [formData, setFormData] = useState({
      fname: '',
      lname: '',
      email: '',
      password: '',
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
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log('Data submitted successfully', response.data);
      alert("Account Successfully Created!");
      /*const response2 = await axios.post('http://127.0.0.1:8000/api/login', formData);
      console.log('Data submitted successfully', response2.data.data.id);
      setUser(response2.data.data.id);
      localStorage.setItem('userId', setUser);*/
      nav("/login");
      window.location.reload(false);
      
      
      
      
      // Handle successful submission (maybe reset the form or navigate to another page)
  } catch (error) {
      console.error('Error submitting data', error);
      alert(error.response.data.message);
      // Handle the error (maybe show an error message to the user)
  }
  };
    
    return (

      
            <Container>
              <Row className="vh-100 d-flex justify-content-center align-items-center moveTop">
                <Col md={8} lg={6} xs={12}>
                  <Card className="px-4">
                    <Card.Body>
                      <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-center text-uppercase ">
                          Registration Form
                        </h2>
                        <div className="mb-3">
                          <form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="fName">
                              
                              <Form.Control type="text" placeholder="Enter First Name" name="fname" value ={formData.fname} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lName">
                              
                              <Form.Control type="text" placeholder="Enter Last Name" name="lname" value ={formData.lname} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              
                              <Form.Control type="email" placeholder="Enter email" name ="email" value={formData.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword1"
                            >
                              
                              <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
                            </Form.Group>

                            <div className="d-grid">
                              <Button variant="primary" type="submit">
                                Create Account
                              </Button>
                            </div>
                            {/*register ? (
                                <p className="text-success">You Are Registered Successfully</p>
                            ) :  ( 
                                <p className="text-danger">You Are Not Registered</p>
                            )*/}
                          </form>
                          
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
  );
  }
  
    export default Registration;
  