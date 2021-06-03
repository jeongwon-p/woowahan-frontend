import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ajax from '../infra/Ajax';

const BoardList : React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ajax.get('http://localhost:8002/post/board/list');
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
          <ListItem button alignItems='flex-start' component={Link}>
            <Link component={RouterLink} to={`/post/article/list?boardId=${item.boardId}`}>
              <ListItemText
                id={item.boardId}
                primary={item.name}
                secondary={item.description}
            />
            </Link>
          </ListItem>
          <Divider variant='inset' component='li' />
        </>
      ))}
    </List>
  );
};

export default BoardList;
