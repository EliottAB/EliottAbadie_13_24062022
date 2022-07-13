import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { User } from "./pages/User";
import { Provider } from "react-redux";
import { store } from "./store.js";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<Signin/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
      </div>
      </Provider>
  );
}

export default App;
