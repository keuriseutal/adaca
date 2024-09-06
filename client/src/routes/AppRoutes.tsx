import {LoginSignupPage, HomePage, NotFoundPage} from '@pages';
import {Routes, Route} from 'react-router-dom';
import {PagePaths} from './PagePaths';
import {ProtectedRoute} from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignupPage />} />
      <Route path={PagePaths.Login} element={<LoginSignupPage />} />
      <Route
        path={PagePaths.Home}
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
