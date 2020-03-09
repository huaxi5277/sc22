import React, { Component } from 'react'
import style from './index.scss'
import { Carousel } from 'antd';
export default class index extends Component {
    render() {
        return (
            <div className="home-wrap">
                <div className className="home-top">
                    <div className="left-img"></div>
                    <div className="right-write">
                  <p> SC2 <br />
                   交流与教学</p>
                </div>
                </div>
                <div className="bg">
               <div className="bg-left">
               <Carousel autoplay>
                <div>
                  <img src="http://sc2.nos.netease.com/images/2017/11/16/265dec2cfb6a167df2018643a8970fc7" alt=""/>
                </div>
                <div>
                <img src="http://sc2.nos.netease.com/images/2019/11/5/9b19b65cabd74a40ca2bf424c4e43857" alt=""/>
                </div>
               <div>
               <img src="https://sc2.nosdn.127.net/images/2018/8/29/aa999fa691ab0cab4ef901856ad18ace" alt=""/>
                </div>
               </Carousel>
               </div>
               <div className="bg-right">
                     <div className="bg-right-list">
                        
                     </div>
               </div>
                </div>
            </div>
        )
    }
}
