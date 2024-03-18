import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container>
      <Header />
      <MainView />
    </Container>
  );
}

export default App;
