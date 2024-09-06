import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}
export const ProtectedRoute = (props: ProtectedRouteProps) => {
  if (!sessionStorage.get('token')) {
    //check if user has token
    return <Navigate to="/login" replace />;
  }
  return props.children;
};
