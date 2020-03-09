import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Private from './utils/Private'
import Login from '../src/routes/users/login'
import Register from '../src/routes/users/register'
const isAuthority = true
let routeArr = [
  {
    path : "/",
    component : ()=>import('../src/routes/IndexPage'),
    model : [],
    routes : [
      {
        path : "/home",
        component : ()=>import('../src/routes/pages/home'),
        model : [],
      },
      {
        path : "/collaborate",
        component : ()=>import('../src/routes/pages/collba'),
        model : [],
      },
      {
        path : "/combat",
        component : ()=>import('../src/routes/pages/combat'),
        model : [],
      },
      {
        path : "/video",
        component : ()=>import('../src/routes/pages/video'),
        model : [],
      }
    ],
  }
]
function RouterConfig({ history,app}) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/login"  component={Login}></Route>
      <Route path="/register"  component={Register}></Route>
        {
          routeArr.map((route,i)=>{
            return (
             <Private {...route} key={i} app={app}></Private>
            )
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;

