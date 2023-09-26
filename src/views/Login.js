import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Col, Row, Container, Card } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';


const Login = () =>{
    const nav = useNavigate();
    //const [userId, setUser] = useState();
    const [formData, setFormData] = useState({
        
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
    //Form Submission
    const handleSubmit = async (e) => {
      e.preventDefault();
        
        //call api
        axios.post('http://127.0.0.1:8000/api/login', formData
        ).then(res=>
        {
        //alert(res.data.data.id);
        const arr = {
          id: res.data.data.id,
          fname: res.data.data.fname,
          lname: res.data.data.lname,
          email: res.data.data.email,
          verified: res.data.data.email_verified_at
        };  
        //setUser(res.data.data.id);
        localStorage.setItem('userDetails', JSON.stringify(arr));
        nav("/");
        //window.location.reload(false);
        //Success alert
        
        if(res["data"]["status"] === "error")
        { 
          localStorage.clear();
          Swal.fire({
            title: 'OPPS',
            text:   "Error",
            type: 'warning',
          
        });
        }
        else
        {
          Swal.fire({
          title: 'WOW',
          text:   "You have been logged-in successfully",
          type: 'success',
          });
      }
      //this.myFormRef.reset();
      }
      );
      }
  
    
      //if(!userId){

      //}
      return (
      
        <Container>
              <Row className="vh-100 d-flex justify-content-center align-items-center moveTop">
                <Col md={8} lg={6} xs={12}>
                  <Card className="px-4">
                    <Card.Body>
                      <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-center text-uppercase ">
                          Login Form
                        </h2>
                        <div className="mb-3">
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Enter Email</label>
                          <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" value ={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Enter Password</label>
                          <input type="password" name="password" className="form-control" id="exampleInputPass1" aria-describedby="passHelp" placeholder="Enter Password" value ={formData.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
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
export default Login;