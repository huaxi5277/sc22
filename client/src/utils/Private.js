import React from 'react'
import {Route, Redirect} from 'dva/router'
import dynamic from 'dva/dynamic'
import NoMatch from '../components/noMatch'
import { connect } from 'dva'

 function Private({routes, component, app, model, isAuthority,userInfo}) {
    return (
        <Route 
        component={DynamicComponent(
            app,model,component,routes, isAuthority,userInfo
        )}
         />
    )
}
const DynamicComponent = (app,model,component,routes,isAuthority,userInfo)=>dynamic({
    app,
    models:()=>model,
    component:()=>
    component().then(res=>{
            const Component = res.default || res;
            return props=><Component {...props} app={app} routes = {routes} userInfo={userInfo}  />
        
    })
})


export function RedirectRoute({from,routes,exact}){
    return(
        <Route render={()=>{
            const routeR =  routes.filter((item)=>{
                  return item.redirect
              })
            const to = routeR.length ? routeR[0].path : routes[0].path;
            return(
              <Redirect to={to} from={from} exact={exact} ></Redirect>
            )
        }} />
    )
}
export function NoMatchRoute({ status = 404 }) {
    return <Route render={props => <NoMatch {...props} status={status} />} />;
  }

  export default connect(({ global }) => ({
      userInfo : global.userInfo
  }))(Private);