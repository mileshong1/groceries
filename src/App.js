import logo from './logo.svg';
import './App.css';
import { useQuery } from "./convex/_generated/react"
import List from './features/list';
import AddArea from './features/addArea';

function App() {
  const items = useQuery("getItems") || [];

  return (
    <div>
      <h1>Grocery List</h1>
      <List></List>

      <h1>Add Items</h1>
      <AddArea></AddArea>
    </div>
    
  );
}

export default App;
