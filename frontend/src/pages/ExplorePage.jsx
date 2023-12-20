import SearchBar from "../components/SearchBar.jsx";
import DbMovieCard from "../components/DbMovieCard.jsx";
import WatchlistModal from "../components/WatchlistModal.jsx";
import api from "../utilities.jsx";
import react, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const ExplorePage = () => {
  const { accessWatchlistData, setAccessWatchlistData } = useOutletContext();
  const [responseData, setResponseData] = useState(null);

  const handleSearch = async (searchTerm) => {
    const encodedUrl = encodeURI(searchTerm);
    let response = await api.get(`movieapi/${encodedUrl}`);
    setResponseData(response.data.results);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12} className="text-center">
          <h1>Search for a movie title</h1>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>

      <Row className="mt-3 justify-content-center">
        <Col md={12} className="text-center">
          <WatchlistModal accessWatchlistData={accessWatchlistData} />
          <div className="flex-container">
            {responseData ? (
              <>
                {responseData.map((item, index) => (
                  <Col key={index} md={4} className="mb-4">
                    <DbMovieCard movie={item} />
                  </Col>
                ))}
              </>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExplorePage;