import React, {useState, useEffect} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
  } from 'reactstrap';
import {axiosWithAuth} from './AxiosAuth';


export const Article = (props) => {


  let [articles, setArticles] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('articles')
    .then(res => {
      console.log(res);
      setArticles(res.data);
    }).catch(err => {
      console.log(err);
    })
  },[]);
useEffect(() => {
  if (props.newArticle.length > 0) {
    setArticles(props.newArticle);
  }
},[props.newArticle])

  return (
    <div>
    {articles.map(item => (
      <div key={item.id}>
        <a href={item.url} target='_blank'>
        <Card>
          <CardImg className='article-img' top src={item.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{item.title}</CardTitle>
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
        </a>
        <div>
          {item.categories.map(cat => <p key={cat}>#{cat}</p>)}
        </div>
      </div>
    ))}
    </div>
  )
}
