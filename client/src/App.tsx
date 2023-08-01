import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';
import Layout from './layout/Layout';

function App() {
  return (
    // <Layout>
    <RouterProvider router={router} />
    // </Layout>
  );
}

export default App;
