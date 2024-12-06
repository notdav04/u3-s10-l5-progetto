import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup } from "react-bootstrap";

const Details = () => {
  //   console.log("------------------------------------details");
  const apikey = "c88260ced423f33c6a139f277053ce86";
  const { lat, lon } = useParams();
  //   console.log(lat, lon);
  const [objWeather, setObjWeather] = useState(null);
  const [obj5days, setObj5Days] = useState();
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  //   console.log("today:", today);

  const fetchWeather = async () => {
    try {
      if (lat && lon) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
        );
        if (response.ok) {
          const responseObj = await response.json();
          setObjWeather(responseObj);
        } else {
          throw new Error(
            "errore nella chiamata Api 2(recupero informazioni meteo da lat e lon)"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetch5days = async () => {
    try {
      if (lat && lon) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
        );
        if (response.ok) {
          const responseObj = await response.json();
          //codice bruttarello, ma fatto da me
          //controllo per prendermi i 5 giorni a 12:00:00
          const notToday = responseObj.list.filter((element) => {
            return element.dt_txt.split(" ")[1] === "12:00:00"; //filtro per vedere dove (dopo aver splittato la stringa dt_txt la 2a parte è uguale a 12:00:00)
          });

          //   console.log("nottoday---------", notToday);
          if (notToday[0].dt_txt.split(" ")[0] === today) {
            //controllo che il primo elemento non sia riferito ad oggi
            setObj5Days(notToday.slice(1));
          } else {
            setObj5Days(notToday);
          }
        } else {
          throw new Error(
            "errore nella chiamata Api 3(recupero informazioni meteo per 5 giorni)"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWeather();
    fetch5days();
  }, [lat, lon]);
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <div className="buble details rounded-5 px-2 position-relative">
          {objWeather && (
            <div className="m-3">
              <div className="d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center">
                  <div className="d-block">
                    <h1 className="d-inline-block">{objWeather.name}</h1>
                    <img
                      src={`https://openweathermap.org/img/wn/${objWeather.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>

                  <div
                    className="rounded-circle bg-dark d-flex justify-content-center align-items-center circle-temp"
                    style={{ height: "100px", width: "100px" }}
                  >
                    <p
                      className="text-light
                     m-0"
                    >
                      {Math.floor(objWeather.main.temp) + "°"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around">
                <div
                  className=" mt-3 rounded-circle d-flex  justify-content-center align-items-center circle-temp"
                  style={{ height: "100px", width: "100px" }}
                >
                  <p
                    className="text-light
                     m-0"
                  >
                    <span className="fs-5">min: </span>
                    {Math.floor(objWeather.main.temp_min) + "°"}
                  </p>
                </div>
                <p className="text-light d-flex align-items-center fs-4">
                  Percepita: {objWeather.main.feels_like}
                </p>
                <div
                  className=" mt-3 rounded-circle bg-dark d-flex  justify-content-center align-items-center circle-temp"
                  style={{ height: "100px", width: "100px" }}
                >
                  <p
                    className="text-light
                     m-0"
                  >
                    <span className="fs-5">max: </span>
                    {Math.floor(objWeather.main.temp_max) + "°"}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Container className="w-50">
                  <Row className="text-center">
                    <Col xs={3}>
                      <i className="bi bi-wind text-light fs-1"></i>
                      <p className="text-light fs-6">
                        {objWeather.wind.speed}m/s
                      </p>
                    </Col>
                    <Col xs={6}>
                      <i className="bi bi-eye text-light fs-1"></i>
                      <p className="text-light fs-6">
                        {objWeather.visibility}m
                      </p>
                    </Col>
                    <Col xs={3}>
                      <i className="bi bi-droplet text-light fs-1"></i>
                      <p className="text-light fs-6">
                        {objWeather.main.humidity}%
                      </p>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div>
                <h4 className="text-white fs-3">Prossimi giorni:</h4>
                <ListGroup>
                  {obj5days &&
                    obj5days.map((element, index) => {
                      return (
                        <ListGroup.Item
                          key={index}
                          className="rounded-3 border border-1 border-white-subtle bg-transparent mb-1 mb-sm-3"
                        >
                          <Row className="text-light">
                            <Col xs={2} className="p-0">
                              <p className="mb-0 d-inline-block">
                                {element.dt_txt.slice(5, 10)}
                              </p>
                            </Col>
                            <Col xs={2}>
                              <p className="mb-0">{element.main.temp}°</p>
                            </Col>
                            <Col xs={3}>
                              <p className="mb-0">
                                min:
                                {" " + element.main.temp_min}°
                              </p>
                            </Col>
                            <Col xs={3}>
                              <p className="mb-0">
                                max:
                                {" " + element.main.temp_max}°
                              </p>
                            </Col>
                            <Col xs={1}>
                              <img
                                src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                                alt=""
                                style={{ height: "30px" }}
                              />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </div>
            </div>
          )}
          <button
            className="buble button-buble rounded-circle  "
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="text-light bi bi-arrow-left"></i>
          </button>
        </div>
      </Container>
    </>
  );
};
export default Details;
