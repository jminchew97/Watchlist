

import React from 'react';
import { Link } from 'react-router-dom';
import { Container,  Button } from 'react-bootstrap';
const HomePage = () => {
    return(
        <Container className="landing-page text-center">

          <h1>Welcome to Your Movie Watchlist</h1>

  
        <section className="hero-section">
          <p>
            Discover, save, and share your favorite movies with ease. Create your
            personalized movie watchlist now!
          </p>
  
          <div className="cta-button">
            <Link to="/watchlist">
              <Button variant="primary">Explore Your Watchlist</Button>
            </Link>
          </div>
        </section>
  
        <section className="explore-section">
          <h2>Explore New Movies</h2>
          <p>
            Find the latest releases, popular movies, and more. Start exploring
            and add them to your watchlist.
          </p>
  
          <div className="cta-button">
            <Link to="/explore">
              <Button variant="secondary">Explore Movies</Button>
            </Link>
          </div>
        </section>
      </Container>

    )
}

export default HomePage