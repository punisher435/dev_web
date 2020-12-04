import React from 'react'
import { Carousel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap'



function Welcome(){
    return(
    <div>
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://cdn.cnn.com/cnnnext/dam/assets/140127103345-peninsula-shanghai-deluxe-mock-up.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://cdn.cnn.com/cnnnext/dam/assets/140127103345-peninsula-shanghai-deluxe-mock-up.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://cdn.cnn.com/cnnnext/dam/assets/140127103345-peninsula-shanghai-deluxe-mock-up.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        <div >
            <Form >
                <Row>
                    <Col>
                    <Form.Control placeholder="First name" />
                    </Col>
                    <Col>
                    <Form.Control placeholder="Last name" />
                    </Col>
                </Row>
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Custom select</Form.Label>
                <Form.Control as="select" custom>
                <option>Room</option>
                <option>Apartment</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicRangeCustom">
                <Form.Label>Range</Form.Label>
                <Form.Control type="range" custom />
            </Form.Group>
            </Form>
        </div>
    </div>
    )
}

export default Welcome