import React from 'react';
import { Button, TextField } from '@material-ui/core/';
import ajax from '../infra/Ajax';

type MyState ={
  emailId: string,
  name: string,
  password: string
}

class CreateUserComponents extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    const param = props.match.params;
    console.log(props);
    console.log(param.emailId);
    console.log(param);
    this.state = {
      emailId: param.userId,
      name: '',
      password: ''
    };

    this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
    this.changeNamesHandler = this.changeNamesHandler.bind(this);
    this.changePasswordsHandler = this.changePasswordsHandler.bind(this);
  }

  getTitle = () => {
    const item = this.state;
    if (item.emailId === '_create') {
      return <h3 className='text-center'>새로운 유저를 만듭니다.(ADMIN계정만 가능)</h3>;
    }
    return <h3 className='text-center'>유저를 수정합니다.(ADMIN계정만 가능)</h3>;
  }

  getHideButton = () => {
    const item = this.state;
    if (item.emailId !== '_create') {
      return <Button variant='contained' color='default' onClick={this.hideUser}>숨기기</Button>;
    }
    return <></>;
  }

  getIdField = () => {
    const item = this.state;
    if (item.emailId === '_create') {
      return (
        <TextField id='outlined-basic' label='id' variant='outlined'
          placeholder='id' onChange={this.changeUserIdHandler}/>
      );
    }
    return (
      <TextField id='outlined-basic' label='id' variant='outlined'
        placeholder='id' disabled value={item.emailId} onChange={this.changeUserIdHandler}/>
    );
  }

  changeUserIdHandler = (event:any) => {
    this.setState({ emailId: event.target.value });
  }

  changeNamesHandler = (event:any) => {
    this.setState({ name: event.target.value });
  }

  changePasswordsHandler = (event:any) => {
    this.setState({ password: event.target.value });
  }

  onPublish = () => {
    const item = this.state;
    console.log(item);
    let url = 'http://localhost:8001/user/join';
    if (item.emailId !== '_create') {
      url = 'http://localhost:8001/user/modify';
    }
    ajax.post(url, null, {
      params: {
        emailId: item.emailId,
        hidden: false,
        name: item.name,
        password: item.password }
    }).then(() => {
      window.history.back();
    }).catch((error) => {
      alert(error);
    });
  };

  hideUser = () => {
    const item = this.state;
    if (window.confirm('정말로 사용자를 숨기기 하시겠습니까?')) {
      ajax.post('http://localhost:8001/user/hide', null, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          userId: item.emailId }
      }).then(() => {
        window.history.back();
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  render() {
    const item = this.state;
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              {
                this.getTitle()
              }
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    User Email Id
                    {
                      this.getIdField()
                    }
                  </div>
                  <div className='form-group'>
                    User Name
                    <TextField id='outlined-basic' label='name' variant='outlined'
                      placeholder='name' value={item.name} onChange={this.changeNamesHandler}/>
                  </div>
                  <div className='form-group'>
                    User Password
                    <TextField id='outlined-basic' label='password' variant='outlined' type='password'
                      placeholder='password' value={item.password} onChange={this.changePasswordsHandler}/>
                  </div>
                  <Button variant='contained' color='default' className='btn btn-success'
                    onClick={this.onPublish}>Save</Button>
                  <Button variant='contained' color='default' className='btn btn-danger'
                    onClick={() => window.history.back()}>Cancel</Button>
                  {
                    this.getHideButton()
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponents;
