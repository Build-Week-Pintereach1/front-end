import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import { Link } from 'react-router-dom';

const articles = [
  {
    Url: '#',
    Title: 'Title 1',
    Subtitle: 'Subtitle',
    Text: 'Dummy text',
    Image: '',
    Category: ['other']
  },
  {
    Url: '#',
    Title: 'Title 2',
    Subtitle: 'Subtitle',
    Text: 'Dummy text',
    Image: '',
    Category: ['geology']
  },
  {
    Url: '#',
    Title: 'Title 3',
    Subtitle: 'Subtitle',
    Text: 'Dummy text',
    Image: '',
    Category: ['chemistry', 'biology','other']
  },
  {
    Url: '#',
    Title: 'Title 4',
    Subtitle: 'Subtitle',
    Text: 'Dummy text',
    Image: '',
    Category: ['chemistry', 'other']
  }
]

export const Article = (props) => {

  return (
    <div>
    {articles.map(item => (
      <div>
        <Link to={item.Url}>
        <Card>
          <CardImg top width="100%" src={item.Image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{item.Title}</CardTitle>
            <CardSubtitle>{item.Subtitle}</CardSubtitle>
            <CardText>{item.Text}</CardText>
          </CardBody>
        </Card>
        </Link>
        <div>
          {item.Category.map(cat => <p>#{cat}</p>)}
        </div>
      </div>
    ))}
    </div>
  )
}
