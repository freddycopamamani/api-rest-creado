import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

// Layout Blueprints

import { LeftSidebar, PresentationLayout } from './layout-blueprints';

// Example Pages

import Buttons from './example-pages/Buttons';
import Dropdowns from './example-pages/Dropdowns';
import NavigationMenus from './example-pages/NavigationMenus';
import ProgressBars from './example-pages/ProgressBars';
import Pagination from './example-pages/Pagination';
import Scrollable from './example-pages/Scrollable';
import Badges from './example-pages/Badges';
import Icons from './example-pages/Icons';
import UtilitiesHelpers from './example-pages/UtilitiesHelpers';
import RegularTables1 from './example-pages/RegularTables1';
import RegularTables4 from './example-pages/RegularTables4';
import FormsControls from './example-pages/FormsControls';
import AddFormCooperativas from './example-components/Admin/Cooperativas/AddFormCooperativas';
import EditFormCooperativa from './example-components/Admin/Cooperativas/EditFormCooperativa';
import AddFormUser from './example-components/Users/AddFormUser';
import EditFormUser from './example-components/Users/EditFormUser';
import AddFormBocamina from './example-components/Admin/Bocaminas/AddFormBocamina';
import EditFormBocamina from './example-components/Admin/Bocaminas/EditFormBocamina';
import AddFormVehiculo from './example-components/Admin/Vehiculos/AddFormVehiculo';
import EditFormVehiculo from './example-components/Admin/Vehiculos/EditFormVehiculo';
import AddFormEmpresa from './example-components/Admin/Empresas/AddFormEmpresas';
import EditFormEmpresa from './example-components/Admin/Empresas/EditFormEmpresas';
import AddFormSocio from './example-components/Admin/Socios/AddFormSocios';
import EditFormSocio from './example-components/Admin/Socios/EditFormSocio';


const DashboardDefault = lazy(() => import('./example-pages/DashboardDefault'));
const Cards3 = lazy(() => import('./example-pages/Cards3'));
const LandingPage = lazy(() => import('./example-pages/LandingPage'));
const Accordions = lazy(() => import('./example-pages/Accordions'));
const Modals = lazy(() => import('./example-pages/Modals'));
const Notifications = lazy(() => import('./example-pages/Notifications'));
const Popovers = lazy(() => import('./example-pages/Popovers'));
const Tabs = lazy(() => import('./example-pages/Tabs'));
const ApexCharts = lazy(() => import('./example-pages/ApexCharts'));
const Maps = lazy(() => import('./example-pages/Maps'));
const ListGroups = lazy(() => import('./example-pages/ListGroups'));
const Cooperativas = lazy(() => import('./example-pages/Cooperativas'));
const Usuarios = lazy(() => import('./example-pages/Users'));
const Bocaminas = lazy(() => import('./example-pages/Bocaminas'));
const Socios = lazy(() => import('./example-pages/Socios'));
const Vehiculos = lazy(() => import('./example-pages/Vehiculos'));
const Conductores = lazy(() => import('./example-pages/Conductores'));
const Empresas = lazy(() => import('./example-pages/Empresas'));
const Login = lazy(() => import('./example-pages/SignIn'));
//const BocaminasNew = lazy(() => import('./example-pages/AddFormProject/BocaminasAdd'))
const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">
                Espere mientras cargamos la vista previa
              </div>
            </div>
          }>
          <Switch>
            <Redirect exact from="/" to="/LandingPage" />
            <Route path={['/LandingPage']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/LandingPage" component={LandingPage} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/DashboardDefault',
                '/Buttons',
                '/Dropdowns',
                '/NavigationMenus',
                '/ProgressBars',
                '/Pagination',
                '/Scrollable',
                '/Badges',
                '/Icons',
                '/UtilitiesHelpers',
                '/Cards3',
                '/Accordions',
                '/Modals',
                '/Notifications',
                '/Popovers',
                '/Tabs',
                '/RegularTables1',
                '/RegularTables4',
                '/FormsControls',
                '/ApexCharts',
                '/Maps',
                '/ListGroups',
                '/Cooperativas',
                '/Cooperativas',
                '/Users',
                '/Bocaminas',
                '/Socios',
                '/Vehiculos',
                '/Conductores',
                '/Empresas',
                '/Login',
                '/Vehiculos/new'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route
                      path="/DashboardDefault"
                      component={DashboardDefault}
                    />
                    <Route path="/Buttons" component={Buttons} />
                    <Route path="/Dropdowns" component={Dropdowns} />
                    <Route
                      path="/NavigationMenus"
                      component={NavigationMenus}
                    />
                    <Route path="/ProgressBars" component={ProgressBars} />
                    <Route path="/Pagination" component={Pagination} />
                    <Route path="/Scrollable" component={Scrollable} />
                    <Route path="/Badges" component={Badges} />
                    <Route path="/Icons" component={Icons} />
                    <Route
                      path="/UtilitiesHelpers"
                      component={UtilitiesHelpers}
                    />
                    <Route path="/Cards3" component={Cards3} />
                    <Route path="/Accordions" component={Accordions} />
                    <Route path="/Modals" component={Modals} />
                    <Route path="/Notifications" component={Notifications} />
                    <Route path="/Popovers" component={Popovers} />
                    <Route path="/Tabs" component={Tabs} />
                    <Route path="/RegularTables1" component={RegularTables1} />
                    <Route path="/RegularTables4" component={RegularTables4} />
                    <Route path="/FormsControls" component={FormsControls} />
                    <Route path="/ApexCharts" component={ApexCharts} />
                    <Route path="/Maps" component={Maps} />
                    <Route path="/ListGroups" component={ListGroups} />
                    <Route exact={true} path="/Cooperativas" component={Cooperativas} />
                    <Route path="/Cooperativas/new" component={AddFormCooperativas} />
                    <Route path="/Cooperativas/:id/editar" component={EditFormCooperativa} />
                    <Route path="/Users" exact={true}  component={Usuarios} />
                    <Route path="/Users/new" exact={true}  component={AddFormUser} />
                    <Route path="/Users/:id/editar" exact={true}  component={EditFormUser} />
                    <Route path="/Bocaminas" exact={true}  component={Bocaminas} />
                    <Route path="/Bocaminas/new" exact={true}  component={AddFormBocamina} />
                    <Route path="/Bocaminas/:id/editar" exact={true}  component={EditFormBocamina} />
                    <Route path="/Socios" exact={true}  component={Socios} />
                    <Route path="/Socios/new" exact={true}  component={AddFormSocio} />
                    <Route path="/Socios/:id/editar" exact={true}  component={EditFormSocio} />
                    <Route path="/Vehiculos" exact={true}  component={Vehiculos} />
                    <Route path="/Vehiculos/new" exact={true}  component={AddFormVehiculo} />
                    <Route path="/Vehiculos/:id/editar" exact={true}  component={EditFormVehiculo} />
                    <Route path="/Conductores" exact={true}  component={Conductores} />
                    <Route path="/Empresas" exact={true}  component={Empresas} />
                    <Route path="/Empresas/new" exact={true}  component={AddFormEmpresa} />
                    <Route path="/Empresas/:id/editar" exact={true}  component={EditFormEmpresa} />
                    <Route path="/Login" exact={true}  component={Login} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
