import { Authenticated, ErrorComponent, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import nestjsxCrudDataProvider from '@refinedev/nestjsx-crud';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import { authProvider } from './authProvider';
import Home from './pages/home';
import { Layout } from './components/layout';
import { ForgotPassword } from './pages/forgotPassword';
import { Register } from './pages/register';
import { Login } from './pages/login';
import Setting from './pages/setting';
import Profile from './pages/setting/Profile';
import UpdatePassword from './pages/setting/UpdatePassword';
import Category from './pages/category';
import { RecordDateProvider } from './provider/RecordDataProvider';
import Wallet from './pages/wallet';
import Record from './pages/record';
import Chart from './pages/chart';
import { HiOutlineWallet } from 'react-icons/hi2';
import { AiOutlineBarChart } from 'react-icons/ai';
import { TbReportSearch } from 'react-icons/tb';

function App() {
  const API_URL = 'http://localhost:5000/api';
  const dataProvider = nestjsxCrudDataProvider(API_URL);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: 'ZeZmaZ-cpl7oS-HeyuDn',
            }}
            resources={[
              {
                name: 'Wallet',
                list: '/wallets',
                icon: <HiOutlineWallet strokeWidth="1" />,
              },
              {
                name: 'Record',
                list: '/records',
                icon: <TbReportSearch strokeWidth="1" />,
              },
              {
                name: 'Chart',
                list: '/charts',
                icon: <AiOutlineBarChart strokeWidth="1" />,
              },
            ]}
          >
            <RecordDateProvider>
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />

                  <Route path="settings">
                    <Route index element={<Setting />} />
                    <Route path="categories" element={<Category />} />
                    <Route path="profile" element={<Profile />} />
                    <Route
                      path="update-password"
                      element={<UpdatePassword />}
                    />
                  </Route>
                  <Route path="wallets" element={<Wallet />}></Route>
                  <Route path="records" element={<Record />}></Route>
                  <Route path="charts" element={<Chart />}></Route>

                  {/* Add Wallet, Category and Record pages here */}
                  {/* Need to think how to handle the redux issue */}

                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={
                        <Layout>
                          <Outlet />
                        </Layout>
                      }
                    >
                      <Navigate to={'/'} replace />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />{' '}
            </RecordDateProvider>
          </Refine>
          {/* <DevtoolsPanel /> */}
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
