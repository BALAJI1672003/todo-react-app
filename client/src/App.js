import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
function App() {
  const [todos,setTodos]=useState([]);
  const [todo,setnewTodo]=useState("");
   useEffect(()=>
   {
     fetchtodos();
   },[])
  const fetchtodos=async()=>
  {
    const response=await axios.get('https://todo-react-app-himf.onrender.com/api/todos');
    setTodos(response.data);
  }
  const addTodo=async()=>
  {
    if(!todo)
      return alert('please enter the task');
    const response=await axios.post('https://todo-react-app-himf.onrender.com/api/todos',{title: todo});
    setTodos([...todos,response.data]);
    setnewTodo("");
  }
  const updateTodo =async(id)=>
  {
    const todo=todos.find((todo)=>id===todo._id)
     const response=await axios.put(`https://todo-react-app-himf.onrender.com/api/todos/${id}`,{completed: !todo.completed});
     setTodos(todos.map((todo)=>(todo._id===id?response.data:todo)))
  }
  const deleteTodo =async(id)=>
  {
    await axios.delete(`https://todo-react-app-himf.onrender.com/api/todos/${id}`);
    setTodos(todos.filter((todo)=>(id!==todo._id)));
  }
  return(
    <div className='App'>
    <h1>TODO LIST</h1>
    <input type="text" value={todo} onChange={(e)=>setnewTodo(e.target.value)}/>
    <button onClick={addTodo}>add Todo</button>
    <ul>
      {todos.map((todo) =>(
        <li key={todo._id}>
          <input type="checkbox" checked={todo.completed} onChange={()=>updateTodo(todo._id)}/>
          {todo.title}
          <button onClick={()=>deleteTodo(todo._id)}>delete</button>
        </li>))}
    </ul>
    </div>
  );
}

export default App;
