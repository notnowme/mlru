import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Movies = () => {
  const popularArr = useSelector((state) => state.movie.popular);
  const [filterArr, setFilterArr] = useState([]);
  const [opt, setOpt] = useState(0);
  const handleSelect = e => {
    setOpt(e);
  }
  const handleFilter = (num) => {
    let filtered = [...popularArr];
    switch(num) {
      case "0":
        filtered.sort((a,b) => {
          if(a.title < b.title) return -1;
          else if(a.title > b.title) return 1;
          else return 0;
        });
        setFilterArr(filtered);
        break;
      case "1":
        filtered.sort((a,b) => {
          if(a.title > b.title) return -1;
          else if (a.title < b.title) return 1;
          else return 0;
        });
        setFilterArr(filtered);
        break;
      case "2":
        filtered.sort((a,b) => a.vote_average - b.vote_average);
        setFilterArr(filtered);
        break;
      case "3":
        filtered.sort((a,b) => b.vote_average - a.vote_average);
        setFilterArr(filtered);
        break;
      case "4":
        filtered.sort((a,b) => a.vote_count - b.vote_count);
        setFilterArr(filtered);
        break;
      case "5":
        filtered.sort((a,b) => b.vote_count - a.vote_count);
        setFilterArr(filtered);
        break;
    };
  }
  const test = (e) => {console.log(e)}
  useEffect(()=>{
    handleFilter(opt);
  },[opt]);
  return (
    <div className="filter">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>정렬</Accordion.Header>
          <Accordion.Body>
            <DropdownButton variant="secondary" id="dropdown-basic-button" title="정렬 방식 선택 ㄱㄱ" onSelect={handleSelect}>
              <Dropdown.Item eventKey={0}>제목 오름차순</Dropdown.Item>
              <Dropdown.Item eventKey={1}>제목 내림차순</Dropdown.Item>
              <Dropdown.Item eventKey={2}>평점 오름차순</Dropdown.Item>
              <Dropdown.Item eventKey={3}>평점 내림차순</Dropdown.Item>
              <Dropdown.Item eventKey={4}>인기도 오름차순</Dropdown.Item>
              <Dropdown.Item eventKey={5}>인기도 내림차순</Dropdown.Item>
            </DropdownButton>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="movieLists">
        {filterArr.map((data) => (
          <Card key={data.id} style={{ width: "18rem" }}>
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
      </div>
    </div>
  );
};

export default Movies;
