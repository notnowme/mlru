import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";

const Movies = () => {
  const { popular } = useSelector((state) => state.movie);
  const [filter, setFilter] = useState([]);

  const movieSorted = (keyword, sortMethod) => {
    // 리액트애서 state는 불변성을 유지해야 하기 때문에
    // 전개 연산자를 통해서 새로운 배열을 생성하고 sort() 함수를 실행해야 한다.
    // 정렬된 배열을 state에 다시 초기화해주면 영화 정보가 정렬되어 출력된다.
    let list = [...filter];
    let result = [];
    if (keyword === "평점") {
      sortMethod === "asc"
        ? (result = list.sort((a, b) => a.vote_average - b.vote_average))
        : (result = list.sort((a, b) => b.vote_average - a.vote_average));
    } else if (keyword === "인기도") {
      sortMethod === "asc"
        ? (result = list.sort((a, b) => a.popularity - b.popularity))
        : (result = list.sort((a, b) => b.popularity - a.popularity));
    } else if (keyword === "제목") {
      sortMethod === "asc"
        ? (result = list.sort((a, b) => a.title.localeCompare(b.title)))
        : (result = list.sort((a, b) => b.title.localeCompare(a.title)));
    }
    setFilter(result);
  };
  useEffect(() => {
    if (popular.length !== 0) {
      setFilter(popular);
    }
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h1>인기 영화 필터링</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>정렬</Accordion.Header>
              <Accordion.Body>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    정렬 방식
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => movieSorted("제목", "asc")}>
                      제목 오름차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => movieSorted("제목", "desc")}>
                      제목 내림차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => movieSorted("평점", "asc")}>
                      평점 오름차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => movieSorted("평점", "desc")}>
                      평점 내림차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => movieSorted("인기도", "asc")}>
                      인기도 오름차순
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => movieSorted("인기도", "desc")}
                    >
                      인기도 내림차순
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col sm={9} className="movie-card-list">
          {filter.map((data) => (
            <Card
              key={data.id}
              style={{ width: "13rem", marginBottom: "10px" }}
            >
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.release_date}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Movies;
