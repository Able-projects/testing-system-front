import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'
import AppMenu from './pages/AppMenu/Menu'
import SignIn from './pages/auth/auth'
import SignUp from './pages/auth/signup';
import AdminPanel from './pages/AdminPanel/adminPanel'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/AppMenu' element={<AppMenu />} />
          <Route exact path='/admin' element={<AdminPanel />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
