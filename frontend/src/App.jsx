import { BrowserRouter , Routes , Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/products/:slug" element= {<ProductPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;