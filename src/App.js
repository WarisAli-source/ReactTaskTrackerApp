import {useState,useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
function App() {
  const [showAddTask,setShowAddTask] = useState(false)


  const [tasks,setTasks]= useState([  
  
])

  useEffect(() => {
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])
  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://localhost:5000/tasks')
    const data = await res.json()
    return data
 }
  //Add Task
  const addTask = (task) =>{
    const id = Math.floor(Math.random()*1000)+1
    const newTask = {id,...task}
    setTasks([...tasks,newTask])
  }


  //Delete task
  const deleteTask = async (id) =>{
    await fetch(`https://localhost:5000/tasks/${id}`,{
      method:'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !==id))
  }
  //Toggle Reminder
  const toggleReminder = (id) =>{
    setTasks(tasks.map((task) => task.id === id ? {...task,reminder:task.reminder} : task))
  }


  return (
    <Router>
    <div className="container">
     <Header 
     onAdd = {() => setShowAddTask(!showAddTask)} 
     showAdd = {showAddTask}
     />
     {showAddTask && <AddTask onAdd = {addTask} />}
     { tasks.length > 0 ?
     <Tasks tasks = {tasks} 
     onDelete ={deleteTask} onToggle = {toggleReminder} /> : ( 'No Task to Show')
      }
      <Route path='/about' component = {About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
