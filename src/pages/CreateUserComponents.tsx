import React from 'react';
import { Button, TextField } from '@material-ui/core/';
import ajax from '../infra/Ajax';

type MyState ={
  userId: string,
  name: string,
  password: string
}

class CreateUserComponents extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userId: '',
      name: '',
      password: ''
    };

    this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
    this.changeNamesHandler = this.changeNamesHandler.bind(this);
    this.changePasswordsHandler = this.changePasswordsHandler.bind(this);
  }

  getTitle = () => {
    return <h3 className='text-center'>새로운 유저를 만듭니다.(ADMIN계정만 가능)</h3>;
  }

  changeUserIdHandler = (event:any) => {
    this.setState({ userId: event.target.value });
  }

  changeNamesHandler = (event:any) => {
    this.setState({ name: event.target.value });
  }

  changePasswordsHandler = (event:any) => {
    this.setState({ password: event.target.value });
  }

  onPublish = () => {
    const item = this.state;
    ajax.post('http://localhost:8001/user/join', null, {  
      params: {
        emailId: item.userId,
        hidden: false,
        name: item.name,
        password: item.password }
    }).then(() => {
      window.history.back();
    }).catch((error) => {
      alert(error);
    });
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
                    <TextField id='outlined-basic' label='id' variant='outlined'
                      placeholder='id' value={item.userId} onChange={this.changeUserIdHandler}/>
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
