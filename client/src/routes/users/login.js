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


  async loginSubmit(e) {
    e.preventDefault();
    if(window.localStorage.getItem('Token')){
       Message.error('您以登录')
    }
    else {
        var res  = {}
        this.props.form.validateFields((err,values)=>{
            const {email,password} = values
            res= {
               email,
               password
            }  
       })
       var respose = await   axios.post('http://localhost:5000/keep/users/login',res)
       if(respose.data.success==true){
        localStorage.setItem('Token', respose.data.token);
        this.props
        .dispatch({
            type:'global/setUserInfo',
            payload : res
        })
        .then(()=>{
          this.props.history.push('/')
        });
       }
       else {
           if(respose.data.callbackNoUser){
            Message.error("用户不存在!")
           }
           else {
            Message.error('账号或密码错误!')
           }
       }
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
                    <Form.Item label="邮箱">
                        {this.props.form.getFieldDecorator('email', {
                            rules: [
                            {
                            required: true,
                            message: '邮箱不能为空, 请输入邮箱'
                            },
                            {
                            pattern: email_reg,
                            validator: this.validatorForm,
                            message: '请输入正确的邮箱格式,如: xxxxxxx@qq.com'
                            }
                            ]
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
                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
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
                    <Form.Item>
                    <Button onClick={(e)=>this.loginSubmit(e)} className="btn" type="primary" style={{width:"380px"}}>
                    登录
                    </Button>
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
