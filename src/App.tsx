import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/constants';
import NavTabs from './ui/NavTabs/NavTabs';
import GaragePage from './features/garage/GaragePage';
import WinnersPage from './features/winners/WinnersPage';

function App() {
  return (
    <>
      <NavTabs />
      <Routes>
        <Route path={ROUTES.GARAGE} element={<GaragePage />} />
        <Route path={ROUTES.WINNERS} element={<WinnersPage />} />
      </Routes>
    </>
  );
}

export default App;
