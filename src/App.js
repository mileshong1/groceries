import logo from './logo.svg';
import './App.css';
import { useQuery } from "./convex/_generated/react"
import List from './features/list';

function App() {
  const items = useQuery("getItems") || [];

  return (
    <div>
      <List></List>
    </div>
    
  );
}

export default App;
