import React, { Component } from 'react'
import {Layout} from 'antd'
import styles from './IndexPage.scss';
import Nav from '../routes/nav/nav'
import {Switch} from 'dva/router'
import Private,{RedirectRoute,NoMatchRoute} from '../utils/Private'
import Foot from '../routes/footer'
const {Header,Content,Footer} = Layout
export default class IndexPage extends Component {
  constructor(){
    super()
  }
  render() {
    const {routes}  = this.props
    return (
      <div>
         <Layout className={styles.layout}>
       <Header className={styles.header}>
         <Nav {...this.props} />
       </Header>
       <Content className={styles.content}>
         <Switch>
           {
            routes.map((route,i)=>{
              return (
                <Private key={i} {...route}></Private>
              )
            })
           }
            <RedirectRoute from="/" exact={true} routes={routes}></RedirectRoute>
         <NoMatchRoute></NoMatchRoute>
         </Switch>
       </Content>
       <Footer>
         <Foot></Foot>
       </Footer>
       </Layout>
      </div>
    )
  }
}

