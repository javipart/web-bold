import logo from './logo.svg';
import './App.scss';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import useAuth from './hooks/useAuth';
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import store from './store';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Component /> : <Login />;
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<ProtectedRoute element={Dashboard} />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
