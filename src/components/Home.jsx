import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const apikey = "c88260ced423f33c6a139f277053ce86";
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const fetchLatLon = async () => {
    try {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${apikey}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((responseObj) => {
          const { lat, lon } = responseObj[0];
          navigate(`/details/${lat}/${lon}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLatLon();
  };

  return (
    <Container
      fluid
      className=" m-0 d-md-flex align-items-center "
      style={{ height: "calc(100vh - 56px)", overflowX: "hidden" }}
    >
      <Row className="w-100">
        <Col sm={12} md={8}>
          <p className="text-light fs-home">
            Scopri le previsioni meteo della tua città
          </p>
        </Col>
        <Col
          sm={12}
          md={4}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="buble home rounded-5  d-flex justify-content-start align-items-center">
            <Form
              className=""
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Form.Group
                className="mx-3 "
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="text-light fs-3">
                  Cerca una città
                </Form.Label>
                <Form.Control
                  className="my-3"
                  as="textarea"
                  rows={1}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <Button type="submit">Cerca</Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
