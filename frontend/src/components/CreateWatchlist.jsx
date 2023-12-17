import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from "../utilities.jsx"
const CreateWatchlist = (props) => {
  const [watchlistName, setWatchlistName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const {myWatchlistData, setMyWatchlistData} = props
  const handleCreateWatchlist = async () => {


    const user = Number(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const data = {
      name:watchlistName,
      user:user,
      isPublic:isPublic
      }
      console.log(data)
    const response = await api.post("watchlist/", data)
    
    if (response.status == 200){
      setMyWatchlistData(...myWatchlistData, response.data["id"])
    }
  };

  return (
    <div>
      <h2>Create a New Watchlist</h2>
      <Form>
        <Form.Group controlId="watchlistName">
          <Form.Label>Watchlist Name:</Form.Label>
          <Form.Control
            type="text"
            value={watchlistName}
            onChange={(e) => setWatchlistName(e.target.value)}
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

        <Button variant="primary" type="button" onClick={handleCreateWatchlist}>
          Create Watchlist
        </Button>
      </Form>
    </div>
  );
};

export default CreateWatchlist;
