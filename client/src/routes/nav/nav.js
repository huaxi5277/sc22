import React, { Component } from 'react'
import {Menu,Dropdown,Icon} from 'antd'
import {Link} from 'dva/router'
import style from './index.scss'
import axios from 'axios'
import setAuthCurrent from '../../utils/setAuthCurrent'
import jwt_decode from 'jwt-decode'
let  status = false
if(window.localStorage.getItem('Token')){
  status = true
  setAuthCurrent(window.localStorage.getItem('Token'))
  let token_res = jwt_decode(window.localStorage.getItem('Token'))
  const currentTime = Date.now() / 1000;
  if (token_res.exp < currentTime) {
    // 过期
     
    // TODO: 清楚用户信息
    window.localStorage.clear();
    window.location.href = "/home"
    window.location.reload()
    // 页面跳转
  }
}

const memus  = [
  {
     key: 'collaborate',
     path : '/collaborate',
     name : 'Collab',
     className : 'go-collaborate',
     status
  },
  {
    key: 'combat',
    path : '/combat',
    name : 'Combat',
    className : 'go-combat',
    status
 },
 {
  key: 'video',
  path : '/video',
  name : 'Video',
  className : 'go-video',
  status
},

]

 class nav extends Component {
     constructor(){
         super()
         this.state = {
            selectedKeys : [],
            users : {}
         }
     }
      /**
   * 当页面刷新时，组件会重新加载，会执行 componentDidMount(cdm) 钩子函数
   * 为解决刷新页面菜单与路由不同步问题，解决方法则放在 cdm 钩子函数里执行
   */
  componentDidMount() {
    this.handleSetSelectedKeys(this.props.location.pathname);

    setAuthCurrent(window.localStorage.getItem('Token'))

    if(window.localStorage.getItem('Token')){
      axios.get('http://localhost:5000/keep/users/current').then((result)=>{
      
          if(result.data){
            this.setState({
              users : result.data
            })
          }
    }).catch((err)=>{})
    }



  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { pathname } = this.props.location;
    if (nextProps.location.pathname !== pathname) {
      this.handleSetSelectedKeys(nextProps.location.pathname);
    }
  }
     handleSetSelectedKeys(pathname) {
        const temp = pathname.split('/');
        console.log(temp);
        
        const key = temp && temp.length <2  ? 'home' : temp[1];
        this.setState({
          selectedKeys: [key]
        });
      }
      handleClickMenu = ({ key }) => {
        if (key === 'logout') {
          window.localStorage.clear();
          this.props.history.push('/')
          window.location.reload()
        }
      };
      menu = (
        <Menu>
           <Menu.Item key="will">
            <span>个人信息</span>
          </Menu.Item>
          <Menu.Item key="logout" onClick={(key)=>this.handleClickMenu(key)}>
            <span>退出</span>
          </Menu.Item>
        </Menu>
      );
    render() {
        return (
            <div>
                <nav className="top-nav">
                  <Menu style={{borderRight:'none'}}
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  selectedKeys={this.state.selectedKeys}
                  >


                    <Menu.Item key="home"><Link to="/" style={{fontWeight:'600',color:"#2c3e50", fontSize:"28px"}}>SC2</Link></Menu.Item>
                   
                    {
                     memus.map(({key,path,name,className})=>{
                      return (
                        <Menu.Item key={key} className={className}>
                        <Link to={path}>
                            {name}
                        </Link>
                    </Menu.Item>
                      )
                      })
                    }
                
                     <Menu.Item key="users" className="users">
                     {
                          localStorage.getItem('Token') ?
                           <Dropdown overlay={this.menu} className="go-login">
                          <a className="ant-dropdown-link">
                      <span className={style.email}>{this.state.users.name}</span>{' '}
                            <Icon className={style.icon} type="down" />
                          </a>
                        </Dropdown> 
                        : 
                        <div><Link to="/login">登录</Link></div>
                      }
                     </Menu.Item>
                  </Menu>
                </nav>
            </div>
        )
    }
}
export default nav
