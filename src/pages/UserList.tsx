import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Button, ListItemText } from '@material-ui/core';
import ajax from '../infra/Ajax';

const UserList : React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajax.get('http://localhost:8001/user');
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!users) {
    return null;
  }

  const downloadExcel = async () => {
    await ajax.get('http://localhost:8001/user/export/excel', {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'user.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button variant='contained' color='default' onClick={downloadExcel}>사용자 Excel 다운로드</Button>
      <Button variant='contained' color='default' onClick={() => history.push('/')}>메인화면으로 돌아가기</Button>
      <List>
        {users && users.map((item: any) => (
          <>
            <ListItem button alignItems='flex-start' component={Link}>
              <ListItemText
                primary={item.emailId}
                secondary={item.name}
             />
            </ListItem>
            <Divider variant='inset' component='li' />
          </>
        ))}
      </List>
    </>
  );
};

export default UserList;
