import React, { useCallback } from 'react';
import './styles/primary-styles.scss';
import axios from 'axios';

const App = () => {
  const sendCreateUser = useCallback(() => {
    axios.post('http://localhost:3001/user', {
      name: 'test1',
      email: 'test1@inbox.ru'
    })
  }, [])
  return (
    <div className="App">
      Book app web
      <button onClick={sendCreateUser}>create user</button>
    </div>
  );
}

export default App;
