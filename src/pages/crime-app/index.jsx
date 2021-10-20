import React, { useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Row,
  Button,
  Table,
} from "reactstrap";
import axios from "axios";

const CrimeApp = () => {
  const [crimes, setCrimes] = useState([]);
  const [crimeUrl, setCrimeUrl] = useState("");
  const [forces, setForces] = useState([]);
  const [forcesUrl, setForcesUrl] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://data.police.uk/api/crime-categories").then((res) => {
      const crimenames = res.data;
      setCrimes(crimenames);
    });

    axios.get("https://data.police.uk/api/forces").then((res) => {
      const forcesname = res.data;
      setForces(forcesname);
    });
  }, []);

  const searchCrimeCategory = () => {
    //   console.log(crimeUrl);
    //   console.log(forcesUrl);
    
    axios
      .get(
          `https://data.police.uk/api/crimes-no-location?category=${crimeUrl}&force=${forcesUrl}`
          )
          .then((res) => {
              setData(res.data);
            });
        };
        console.log(data);
        
        let count = 0;
  return (
    <div>
      <Container className="m-auto">
        <Row>
          <Col md={5}>
            <FormGroup>
              <Label for="exampleSelect">Crime</Label>
              <Input
                type="select"
                onChange={(event) => setCrimeUrl(event.target.value)}
                name="select"
                id="exampleSelect"
              >
                <option value="">Select Crime</option>

                {crimes.map((item, index) => (
                  <option value={item.url}>{item.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label for="exampleSelect">Forces</Label>
              <Input
                type="select"
                onChange={(event) => setForcesUrl(event.target.value)}
                name="select"
                id="exampleSelect"
              >
                <option value="">Select Force</option>
                {forces.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          <Col md={2}>
            <Button
              color="success"
              onClick={searchCrimeCategory}
              className="mt-4"
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
            {!data.length ? (
                
                 <Table>
                 <thead>
                 
                 </thead>
                 <tbody>
                   <tr className="text-center">
                     
                     <td>NO DATA !!</td>
                     
                   </tr>
                 </tbody>
               </Table>
            ):(

          <Table>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Id</th>
                <th>Category</th>
                <th>Outcome Status Category</th>
                <th>Outcome Status Date</th>
              </tr>
            </thead>
            {data.map((item, index) => {
                return(

            <tbody>
              <tr key={index}>
                <th scope="row">{++count}</th>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.outcome_status.category}</td>
                <td>{item.outcome_status.date}</td>
              </tr>
            </tbody>
                )
            })}
          </Table>
            )}
        </Row>
      </Container>
    </div>
  );
};

export default CrimeApp;
