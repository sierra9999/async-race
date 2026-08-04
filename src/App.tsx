import { Routes, Route } from 'react-router-dom';
import NavTabs from '@/ui/NavTabs/NavTabs';
import GaragePage from '@/features/garage/GaragePage';
import WinnersPage from '@/features/winners/WinnersPage';
import NotFound from '@/ui/NotFound/NotFound';
import { ROUTES } from '@/constants';

function App() {
  return (
    <>
      <NavTabs />
      <main>
        <Routes>
          <Route path={ROUTES.GARAGE} element={<GaragePage />} />
          <Route path={ROUTES.WINNERS} element={<WinnersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
