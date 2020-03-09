import React, { Component } from 'react'
import style from './index.scss'
export default class index extends Component {
    render() {
        return (
            <div className="cprt">
                 <div className="cprt-top">
                     <div className="cprt-left">
                         <div className="div-left">
                         <a target="_blank" href="https://www.battlenet.com.cn/" className="logo_bz"></a>
                         </div>
                         <div className="div-right">
                         <a target="_blank" href="http://www.163.com/" className="logo_ne"></a>
                         </div>
                     </div>
                     <div className="cprt-right">
                     <ul className="clearFix footer-ul">
                        <li>
                            <a href="https://www.battlenet.com.cn/zh/legal-cn/privacy" target="_blank">隐私</a>|</li>
                        <li>
                            <a href="https://www.battlenet.com.cn/zh/legal-cn/" target="_blank">法律条款</a>|</li>
                        <li>
                            <a href="https://dev.battle.net/" target="_blank">API</a>
                        </li>
                    </ul>
                    <p>©2020 暴雪娱乐有限公司版权所有 <span>由上海网之易网络科技发展有限公司运营</span><a href="https://www.battlenet.com.cn/legal-cn/infringementnotice" target="_blank"> 著作权侵权</a><span className="es-line isEsport">&nbsp;|&nbsp;</span><span id="js_shenzi">新出审字[2013]417号</span></p>
                    <p><span id="js_wenjinwang">文网进字[2013]0020号</span><span className="es-line isEsport">&nbsp;|&nbsp;</span><a href="https://blz.nosdn.127.net/1/frame/cprt/license.pdf" target="_blank">沪网文号〔2017〕9633-727号</a>&nbsp;|&nbsp;<a href="https://blz.nosdn.127.net/1/frame/cprt/appreciation-licence.pdf" target="_blank">增值电信业务经营许可证编号：沪B2－20080012</a>&nbsp;|&nbsp;<a href="http://beian.miit.gov.cn" target="_blank">沪ICP备：沪B2－20080012</a></p>
                    <p>互联网违法和不良信息举报电话：0571-28090163&nbsp;沪公网安备 31011502022167号&nbsp;|&nbsp;<a href="https://blz.nosdn.127.net/1/frame/cprt/self-discipline.pdf" target="_blank">上海市网络游戏行业自律公约</a></p>
                    <p className="integrity" style={{marginTop: " 15px"}}>
                        <a target="_blank" href="http://sh.cyberpolice.cn/infoCategoryListAction.do?act=initjpg">
                            <img src="https://blz.nosdn.127.net/1/frame/cprt/police.png" />  
                        </a>
                            <a target="_blank" href="http://www.zx110.org/" >
                            <img src="https://blz.nosdn.127.net/1/frame/cprt/zx110.png" />
                            </a>
                            <a target="_blank" href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&amp;entyId=20111011175417664">
                            <img src="https://blz.nosdn.127.net/1/frame/cprt/sgs-icon.png"/>
                            </a>
                            <a target="_blank" href="http://www.shjbzx.cn/">
                            <img src="https://blz.nosdn.127.net/1/frame/cprt/icon20120516.png" />
                            </a>
                            <a target="_blank" href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08b4f2a5553014f399799d50b35" className="emark"><img src="https://blz.nosdn.127.net/1/frame/cprt/emark.png" /></a><span>| &nbsp;适龄提示：适合13岁及以上使用&nbsp;&nbsp;</span><a href="https://www.battlenet.com.cn/support/zh/article/280" target="_blank">家长监护工程</a></p>
                     </div>
                 </div>
                 <div className="cprt-bottom">
                     <p>
                     积极健康的游戏心态是健康游戏的开端，本游戏故事情节设置紧凑，请您合理控制游戏时间，避免沉溺游戏影响生活，注意自我保护，防范网络陷阱。<br/>
                     健康游戏忠告：抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。
                     </p>
                 </div>
            </div>
        )
    }
}
