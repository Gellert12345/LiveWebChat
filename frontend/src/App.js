import "./App.css"; //button impőortlajak mert már előre meg van irva ffazsasra
import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/ChatPage";
function App() { return(
    <div className="App">
        <Route path="/" component={Homepage} exact />
        <Route path="/chats" component={Chatpage} />
    </div> ); }
export default App;// test
