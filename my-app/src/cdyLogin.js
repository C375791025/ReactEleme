import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'element-theme-default';


import './cdyLogin.css'
import { Switch } from 'element-react';
import { Button } from 'element-react';
const qs = require('querystring')


export class cdyLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: "",
            username: "",
            password: "",
            code_p: "",
        };

        this.getData = this.getData.bind(this);
        this.getCode = this.getCode.bind(this);
        this.changeCode = this.changeCode.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.changePass = this.changePass.bind(this);

    };

   //   React里的class中的方法（函数）不会默认绑定this，需要我们手动绑定；
        // 不用箭头函数，用function，fetch方法bind绑定一下this，不想改变this指向的三种方法：1.箭头函数9es6)，2.bind，3.可以在给DOM元素节点绑定事件时,就改变this的指向；


    //组件挂载完成
    componentWillMount() {
        this.getCode();
    }

    getCode() {
        // 请求验证码
        fetch("https://elm.cangdu.org/v1/captchas", {
            method: "POST",
            credentials: 'include',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            },
            body: qs.stringify({

            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            this.setState({
                code: data.code
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    getData() {
        fetch("https://elm.cangdu.org/v2/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'application/json'
            },
            body: qs.stringify({
                username: this.state.username,
                password: this.state.password,
                captcha_code: this.state.code_p
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    // 账号
    changeUser(e) {
        // console.log(e.target.value);    //获取修改后的值
        this.setState({
            username: e.target.value

        })
        console.log(this.state.username);
    }
    // 密码
    changePass(e) {
        // console.log(e.target.value);    //获取修改后的值
        this.setState({
            password: e.target.value
        })
    }
    // 验证码
    changeCode(e) {
        // console.log(e.target.value);    //获取修改后的值
        this.setState({
            code_p: e.target.value
        })
    }
    render() {
        return (
            <div className="cdylogin">
                {/* 1.头部 */}
                <div id="header">
                    <Link to="/cdyHome">
                        <span id="eleme"><i className="el-icon-arrow-left"></i></span>
                        <span id="login">密码登录</span>
                    </Link>

                </div>
                {/* 2.输入框账号密码 */}
                <div id="inp">
                    <input type="text" placeholder="账号" value={this.state.username} onChange={(event) => { this.changeUser(event) }} ref="a" />
                    <div>
                        <input type="text" placeholder="密码" id="password" value={this.state.password} onChange={(event) => { this.changePass(event) }} />
                        <Switch
                            value={true}
                            onText=""
                            offText="">
                        </Switch>

                    </div>
                    <div>
                        <input type="text" placeholder="验证码" id="codeInp" value={this.state.code_p} onChange={(event) => { this.changeCode(event) }} />
                        <img src={this.state.code} alt="" id="code" />
                        <p onClick={this.getCode}>换一张</p>
                    </div>
                </div>
                <div id="flag">
                    <p>温馨提示：未注册过的账号，登陆时将自动注册</p>
                    <p>注册过的用户可凭账号密码登录</p>
                </div>

                {/* 3.点击登录 */}
                <div id="footer">
                    <button id="sh3" onClick={this.getData}>登录</button>
                </div>
                {/* 4.重置密码 */}
                <div id="float">
                    <p id="sh4">重置密码</p>
                </div>
                <Button type="primary">Hello</Button>
            </div >
        )
    }
}

export default cdyLogin
