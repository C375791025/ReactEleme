import React, { Component } from 'react'

//element-ui 导入
import ReactDOM from 'react-dom';
// import { Button } from 'element-react';
// import { Rate } from '../node_modules/element-react';
import 'element-theme-default';
import PropTypes from 'prop-types'


import Swiper from 'swiper/js/swiper.js'
import '../node_modules/swiper/css/swiper.min.css'


import './x_homepage.css'

export class x_homepage extends Component {
    constructor(props) {
      super(props)
      this.state = {
         entry1:[],
         entry2:[],
         restaurants:[],
      }

    }
    componentWillMount() {
        this.getEntry();
        this.getRestaurants();
    }
    componentDidMount(){
        console.log('fffffffffffffff')
        var mySwiper=new Swiper('.swiper-container', {
        direction: 'horizontal',//竖向轮播
        loop: true,//无缝轮播
        pagination: {//小圆点分页
            el: '.swiper-pagination',
        }
        })
    }
    getEntry(){ //网路请求，请求食品分类数据
        fetch(
            "https://elm.cangdu.org/v2/index_entry",
             {method:"get"}
        ).then((res)=>{
            return res.json();
        }).then((data)=>{
            //将返回的数据分成两部分
            let one=[],two=[];
            for (let i = 0; i < data.length; i++) {
                    if (i>=8) {
                        two.push(data[i])
                    }else{
                        one.push(data[i])
                    }
            }
            this.setState({
                entry1:one,
                entry2:two
            })
            // console.log(this.state.entry1,this.state.entry2);
        }).catch((err)=>{
            console.log(err)
        })
    }
    getRestaurants(){ //网路请求，请求食品分类数据
        fetch(
            "https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762",
             {method:"get"}
        ).then((res)=>{
            return res.json();
        }).then((data)=>{
            this.setState({
                restaurants:data
            })
            console.log("aaaaaaaaaaaaaaa",this.state.restaurants)
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <div className="register">
                    <span className="register_left" ><i className="el-icon-search"></i></span>
                    <span className="register_centre"></span>
                    <span className="register_right" >切换城市</span>
                </div>
                
                <div className="swiper-container classify">
                    <div className="swiper-wrapper sw">
                        <div className="swiper-slide swsl">
                        {
                            this.state.entry1.map((v,i)=>{
                                return <div className="swsldiv" key={i}>
                                        <img src={"https://fuss10.elemecdn.com"+v.image_url}  className="swslimg"/>
                                        <div  className="swsltext">{v.title}</div>
                                        </div> 
                            })  
                        }
                        </div>
                        <div className="swiper-slide swsl">
                        {
                            this.state.entry2.map((v,i)=>{
                                return <div  className="swsldiv" key={i}>
                                        <img src={"https://fuss10.elemecdn.com"+v.image_url}  className="swslimg"/>
                                        <div  className="swsltext">{v.title}</div>
                                        </div> 
                            })  
                        }
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>

                <div className="nearbymerchant">
                    {/* 区域标题 */}
                    <div className="nmtitle">
                        <i className="el-icon-house"></i>
                        <span>附近商家</span>
                    </div>
                    {/* 附近商家 */}
                    <div className="nmcontent">
                     {
                        //  console.log(this.state.restaurants)
                         this.state.restaurants.map((v,i)=>{
                            return <div className="nmc" key={i}>
                                        <img src={"http://elm.cangdu.org/img/"+v.image_path} className="nmcimg"/>
                                            <div className="nmcright" >
                                                {/* 第一行 */}
                                                <div className="one">
                                                    <span className="onespan">品牌</span>
                                                    <span  className="onename"></span>
                                                    <div className="oneicon">
                                                        {
                                                            v.supports.map((v2,i2)=>{
                                                                return <div key={i2}>{v2.icon_name}</div>
                                                            })
                                                        }
                                                    </div>   
                                                </div>

                                                {/* 第二行 */}
                                                <div className="two">
                                                    {/* <Rate disabled={true} value={3.9} showText={true} /> */}
                                                    <span className="twoorde">
                                                        月售<span>{v.recent_order_num}</span>单
                                                    </span>
                                                    <div className="twotime">{v.supports[1].name}</div>
                                                    <div className="twobird">{v.delivery_mode.text}</div>
                                                </div>
                                                {/* 第三行 */}
                                                <div className="three">
                                                    <span className="threeprice">
                                                        ￥{v.float_minimum_order_amount}起送/配送费约￥{v.float_delivery_fee}
                                                    </span>
                                                    <span className="threetime">{v.order_lead_time}</span>
                                                    <span className="threedistance">{v.distance}/</span>
                                                </div>


                                            </div>



                                    </div>
                         })
                     }
                    </div>
                </div>


            </div>
        )
    }
}
// withRouter()
export default x_homepage
