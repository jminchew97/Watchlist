import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import api from '../utilities.jsx';

const CreateWatchlist = (props) => {
  const [watchlistName, setWatchlistName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const {setDataTrigger,dataTrigger} = useOutletContext()

  const handleCreateWatchlist = async (e) => {
    e.preventDefault();
    const user = Number(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    api.defaults.headers.common['Authorization'] = `Token ${token}`;
    const data = {
      name: watchlistName,
      user: user,
      isPublic: isPublic,
    };

    const response = await api.post('watchlist/', data);

    if (response.status === 200) {
      props.myWatchlistData ? 
      props.setMyWatchlistData([...props.myWatchlistData, response.data]) :
      props.setMyWatchlistData([response.data])
    }
    
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4 border rounded bg-light">
            <h2>Create a New Watchlist</h2>
            <Form>
              <Form.Group controlId="watchlistName">
                <Form.Label>Watchlist Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={watchlistName}
                  onChange={(e) => setWatchlistName(e.target.value)}
                  autoComplete='off'
                />
              </Form.Group>
              <Form.Group controlId="isPublic">
                <Form.Check
                  type="checkbox"
                  label="Public Watchlist"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </Form.Group>

              <Button variant="dark" type="button" onClick={(e) => handleCreateWatchlist(e)}>
                Create Watchlist
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWatchlist;
