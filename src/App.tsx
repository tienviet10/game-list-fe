import ContextWrapper from './ContextWrapper';
import Router from './Router';
import Navbar from './components/Navbar';

function App() {
  return (
    <ContextWrapper>
      <Navbar />
      <Router />
    </ContextWrapper>
  );
}

export default App;
