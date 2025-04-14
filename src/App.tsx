import React from 'react';
import TodoList from './components/todo-list';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <TodoList />
      </header>
    </div>
  );
}

export default App;
