import React, { Component } from 'react'
import style from './index.scss'
import 'normalize.css'
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import axios from 'axios'
import {connect} from 'dva'
import {Form,Message,Button,Input} from 'antd'
@connect()
class index extends Component {
    constructor(){
        super()
    }
     // 自定义表单校验规则
   validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };

  // 自定义校验两次密码是否一致
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue('password')) {
      callback(rule.message);
      return;
    }
    callback();
  };

  async registerSubmit(e) {
    e.preventDefault();
  
   
        var res  = {}
        this.props.form.validateFields((err,values)=>{
            const {email,password,name} = values
            res= {
               email,
               password,
               name
            }  
       })
       var respose = await   axios.post('http://localhost:5000/keep/users/register',res)
        if(respose.data.callbackEmail){
            Message.error('邮箱被注册')
        }
        else if (respose.data.email){
            this.props.history.push('/login')
        }
  };
    render() {
        return (
            <div className="login-wrap">
               <div className="login-wrap-title">
                   <div className="bg-login-wrap-title"></div>
               </div>

            <div className="login">
            <Form className="account-form">
                            <Form.Item label="用户名">
                                {this.props.form.getFieldDecorator('name', {
                                  rules: [
                                    {
                                      required: true,
                                      message: '不能为空！'
                                    },
                                  ]
                                })(
                                  <Input
                                    maxLength={16}
                                    type="text"
                                  />
                                )}
                              </Form.Item>  



                              <Form.Item label="邮箱">
                                {this.props.form.getFieldDecorator('email', {
                                  rules: [
                                    {
                                      required: true,
                                      message: '邮箱不能为空, 请输入邮箱'
                                    },
                                    // {
                                    //   type: 'email',
                                    //   message: '请输入正确的邮箱格式, 如: 27732357@qq.com'
                                    // }
                                    {
                                      pattern: email_reg,
                                      validator: this.validatorForm,
                                      message: '请输入正确的邮箱格式,如: xxxxxx@qq.com'
                                    }
                                  ]
                                  // initialValue: this.state.email
                                })(<Input />)}
                              </Form.Item>
                              <Form.Item label="密码">
                                {this.props.form.getFieldDecorator('password', {
                                  rules: [
                                    {
                                      required: true,
                                      message: '密码不能为空，请输入密码！'
                                    },
                                    {
                                      pattern: pwd_reg,
                                      validator: this.validatorForm,
                                      message:
                                        '密码格式：6-16位字母、数字或特殊字符 _-.'
                                    }
                                  ]
                                })(
                                  <Input
                                    maxLength={16}
                                    type="password"
                                    placeholder="请输入6-16位字母、数字或特殊字符的密码"
                                  />
                                )}
                              </Form.Item>
                              <Form.Item label="确认密码">
                                {this.props.form.getFieldDecorator('password2', {
                                  rules: [
                                    {
                                      required: true,
                                      message: '密码不能为空，请输入密码！'
                                    },
                                    {
                                      pattern: pwd_reg,
                                      validator: this.validatorForm,
                                      message:
                                        '密码格式：6-16位字母...'
                                    },
                                    {
                                      validator: this.validatorPwd,
                                      message: '两次输入的密码不一致！'
                                    }
                                  ]
                                })(
                                  <Input
                                    maxLength={16}
                                    type="password"
                                    placeholder="请输入确认密码"
                                  />
                                )}
                              </Form.Item>
                              <Form.Item>
                                <Button onClick={(e)=>this.registerSubmit(e)} className="btn" type="primary" style={{width:"380px"}}>
                                  注册
                                </Button>
                              </Form.Item>
                               <Form.Item style={{width:"380px", textAlign : "right" }}>
                                <a href="/login"  onClick={(e)=>this.preventLogin(e)}>已有账号马上登录</a>
                               </Form.Item>
                            </Form>
               </div>
               <div className="footer-wrap">
               <div className="footer-links">
                <a className="nav-item nav-a" href="https://www.battlenet.com.cn/zh/legal-cn/" data-analytics="global-nav" data-analytics-placement="Footer - eula">Battle.net EULA</a>
                <span>|</span>
                <a className="nav-item nav-a" href="https://www.battlenet.com.cn/account/legal/privacy.html" data-analytics="global-nav" data-analytics-placement="Footer - Privacy">隐私</a>
                <span>|</span>
                <a className="nav-item nav-a" href="//www.battlenet.com.cn/zh/legal-cn/" data-analytics="global-nav" data-analytics-placement="Footer - Terms">法律条款</a>
                <span>|</span>
                <a className="nav-item nav-a" href="https://www.battlenet.com.cn/legal-cn/infringementnotice" data-analytics="global-nav" data-analytics-placement="Footer - copyright">著作权侵权</a>
                </div>
                 <div className="footer-link2s">
                 <a className="nav-item nav-a" href="http://www.battlenet.com.cn/static/local-common/images/legal/cn/license.png" data-analytics="global-nav" data-analytics-placement="Footer - CN License">沪网文〔2017〕9633-727号</a>
                 <span>|</span>
                 <a className="nav-item nav-a" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" data-analytics="global-nav" data-analytics-placement="Footer - CN Portal">增值电信业务经营许可证编号：沪B2－20080012</a>
                 </div>
                 <div className="footer-link3s">
                 <span className="nav-item nav-text">互联网违法和不良信息举报电话：0571-28090163</span>
                 <span>|</span>
                 <span className="nav-item nav-text">沪公网安备：31011502002167</span>
                 </div>
                 <div className="copyright">©2020暴雪娱乐有限公司版权所有。</div>
                 <ul className="nav-footer-icon-list">
                <li className="nav-footer-icon-list-item"><a className="nav-footer-icon-link footer-icon-cyberpolice" href="http://sh.cyberpolice.cn/infoCategoryListAction.do?act=initjpg" target="_blank"></a></li>
                <li className="nav-footer-icon-list-item"><a className="nav-footer-icon-link footer-icon-zx100" href="http://www.zx110.org/" target="_blank"></a></li>
                <li className="nav-footer-icon-list-item"><a className="nav-footer-icon-link footer-icon-sgs" href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&amp;entyId=20111011175417664" target="_blank"></a></li>
                <li className="nav-footer-icon-list-item"><a className="nav-footer-icon-link footer-icon-shjbzx" href="http://www.shjbzx.cn/" target="_blank"></a></li>
                </ul>
               </div>
            </div>
        )
    }
}
const HorizontalLoginForm = Form.create({})(index)

export default HorizontalLoginForm