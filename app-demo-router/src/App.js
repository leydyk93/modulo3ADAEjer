import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Products";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import './App.css';
import Nav from "./components/nav";

function App() {
  return (
    <>
    <Router>
      <div className="text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <Nav/>
        </div>
      </div>
      <div>
        <Switch>
        <Route exact path="/products">
          <Productos />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
    </>
    
  );
}

export default App;


