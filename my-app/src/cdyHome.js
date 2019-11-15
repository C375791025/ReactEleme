import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './cdyHome.css'

import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.css'

export class cdyHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            swiperData: [],//react比较规范
            swiperImg: "",
            swiperTitle: "",
            shopData: [],
        };

        this.getSwiper = this.getSwiper.bind(this);
        this.getShop = this.getShop.bind(this);
    };


    // 组件将要被挂载
    componentWillMount() {
        // 2.请求轮播图数据
        this.getSwiper();
        this.getShop();
    }
    // 组件挂载完成
    componentDidMount() {
        // 轮播图
        new Swiper('.swiper-container', {
            loop: true,//无缝轮播
            pagination: {//小圆点分页
                el: '.swiper-pagination',
            },

        })

    }


    getSwiper() {
        fetch("https://elm.cangdu.org/v2/index_entry",
            { method: "get" }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                for (let i = 0; i < data.length / 8; i++) {//循环两次
                    //长度为16的数组分割为两个长度为8的数组
                    let subArr = data.slice(i * 8, (i + 1) * 8);
                    console.log(subArr);
                    // 常规写法
                    this.setState({
                        swiperData: [...this.state.swiperData, subArr]
                    })
                    // 优化写法----异步
                    // this.setState((perviousState)=>{
                    //     return{
                    //          swiperData: [...perviousState.subArr,subArr]
                    //     }

                    // },()=>{

                    // })

                }


                console.log(this.state.swiperData)
            }).catch((err) => {
                console.log(err);
            })
    }

    getShop() {
        fetch("https://elm.cangdu.org/shopping/restaurants?latitude=2&longitude=2", { method: "get" }
        ).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            this.setState({
                shopData: data
            })
            console.log(this.state.shopData)
        }).catch((err) => {
            console.log(err)
        })
    }
    // 渲染组件
    render() {
        return (
            <div className="cdyhome">
                {/* 1.头部 */}
                <Link to="/">
                    <div className="header">
                        <span className="eleme"><i className="el-icon-arrow-left"></i></span>
                        <span>首页</span>
                        <span>
                            <i className="el-icon-share"></i>
                        </span>
                    </div>
                </Link>
                {/* 2.轮播图 */}
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.swiperData.map((v, i) => {
                                return <div className="swiper-slide" key={i}>
                                    {
                                        v.map((v1, i1) => {
                                            return <div>
                                                <img src={'https://fuss10.elemecdn.com' + v1.image_url} key={i1} />
                                                <p>{v1.title}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                    {/* <!-- 如果需要分页器 --> */}
                    <div className="swiper-pagination"></div>
                </div>
                {/* 3.附近商家 */}
                <div className="nearbyShop">
                    <i className="el-icon-star-on"></i>
                    <span>附近商家</span>
                </div>
                {/* 4.商铺列表*/}
                <div className="shopList">
                    <ul>
                        {
                            this.state.shopData.map((v, i) => {
                                return <li>
                                    <img src={"//elm.cangdu.org/img/"+ v.image_path} alt=""/>
                                    <p>{v.name}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default cdyHome
