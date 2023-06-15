import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Article = ({ title, content, imageUrl, url }) => {
  return (
    <Card className="text-white bg-dark">
      {imageUrl && <Card.Img variant="top" src={imageUrl} alt="" />}
      <Card.Body>
        <Card.Title>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </Card.Title>
        <Card.Text>{content}</Card.Text>
        <div className="d-flex justify-content-end">
          <Button variant="outline-light" className="mr-2">
            Comment
          </Button>
          <Button variant="outline-light">Like</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Article;
