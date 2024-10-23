
import './components/css-files/app.css'
import { router } from './routerList';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
