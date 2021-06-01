import React, { useEffect, useState } from 'react';
import ajax from '../infra/Ajax';

const HackerNewsList : React.FC = () => {
  const [news, setNews] = useState();
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
    <>
    </>
  );
};

export default HackerNewsList;
