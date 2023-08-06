import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import useTokenAuth from '@/hooks/useTokenAuth';
import Login from './pages/Login';
import Register from './pages/Register';

function Router() {
  const { loading, userState } = useTokenAuth();

  if (loading || userState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="*"
        element={
          // userState?.user?.username ? (
          //   <Navigate to="/user-profile/overview" />
          // ) : (
          //   <Navigate to="/home" />
          // )
          <Navigate to="/home" />
        }
      />
    </Routes>
  );
}

export default Router;
