import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'
import Test from './pages/test/Test'
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<h1>Main page</h1>} />
          <Route exact path='/auth' element={<h1>Auth page</h1>} />
          <Route exact path='/test' element={<Test />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
