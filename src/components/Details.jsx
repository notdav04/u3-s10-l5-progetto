import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup } from "react-bootstrap";

const Details = () => {
  console.log("------------------------------------details");

  const apikey = "c88260ced423f33c6a139f277053ce86";
  const { lat, lon } = useParams();
  console.log(lat, lon);
  const [objWeather, setObjWeather] = useState(null);
  const [obj5days, setObj5Days] = useState();
  const today = new Date().toISOString().split("T")[0];

  console.log("today:", today);

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
          //codice bruttarello, ma frutto del pensiero logico
          //controllo per prendermi i 5 giorni a 12:00:00
          const notToday = responseObj.list.filter((element) => {
            return element.dt_txt.split(" ")[1] === "12:00:00"; //filtro per vedere dove (dopo aver splittato la stringa dt_txt la 2a parte è uguale a 12:00:00)
          });

          console.log("nottoday---------", notToday);
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
        <div className="buble details rounded-5 px-2">
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

                  {console.log(objWeather.weather[0].icon)}
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
                    <Col sm={4}>
                      <i className="bi bi-wind text-light fs-1"></i>
                      <p className="text-light fs-4">{objWeather.wind.speed}</p>
                    </Col>
                    <Col sm={4}>
                      <i className="bi bi-eye text-light fs-1"></i>
                      <p className="text-light fs-4">{objWeather.visibility}</p>
                    </Col>
                    <Col sm={4}>
                      <i className="bi bi-droplet text-light fs-1"></i>
                      <p className="text-light fs-4">
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
                          className="rounded-3 border border-1 border-white-subtle bg-transparent mb-3"
                        >
                          <Row>
                            <Col xs={3}>
                              <p className="mb-0">
                                {element.dt_txt.slice(5, 10)}
                              </p>
                            </Col>
                            <Col xs={5}>
                              <p className="mb-0">
                                {element.main.temp}° -- min:
                                {element.main.temp_min}° -- max:
                                {element.main.tamp_max}°
                              </p>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
export default Details;
