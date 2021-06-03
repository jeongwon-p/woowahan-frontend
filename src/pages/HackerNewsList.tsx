import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ajax from '../infra/Ajax';

const HackerNewsList : React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ajax.get('http://localhost:8002/post/hackernews/lately');
        console.log(response);
        setNews(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중 ...</div>;
  }

  if (!news) {
    return null;
  }

  return (
    <List>
      {news && news.map((item: any) => (
        <>
          <ListItem button alignItems='flex-start' component='a' href={item.url}>
            <ListItemText
              primary={item.title}
              secondary={item.by}
           />
          </ListItem>
          <Divider variant='inset' component='li' />
        </>
      ))}
    </List>
  );
};

export default HackerNewsList;
