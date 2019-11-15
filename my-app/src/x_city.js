import React, { Component } from 'react'


export class x_city extends Component {
    constructor(props) {
      super(props)
      this.state = {
         guess:'',
      }
      this.getRoute=this.getRoute.bind(this)
    }
    componentWillMount() {
        console.log("ccccccccccccccc")
        this.getGuess();
    }

    getGuess(){ //网路请求，请求城市数据
        console.log("eeeeeeeeeeeeeeeeee")
        fetch(
            "https://elm.cangdu.org/v1/cities?type=guess",
             {method:"get"}
        ).then((res)=>{
            console.log(res);
            return res.json();
        }).then((data)=>{
            console.log("aaaaaaaaaaaa")
            console.log(data);
            this.setState({
                guess:data
            })
        }).catch((err)=>{
             console.log("bbbbbbbbbbbbbbb")
            console.log(err)
        })
    }

    getRoute(){
        this.props.history.push('/x_homepage')
    }
    render() {
        return (
            <div>
                <div style={{background:'red',width:'3.75rem'}}>
                    {this.state.guess}
                </div>
                <button onClick={this.getRoute}>阿萨斯大所</button>
            </div>
        )
    }
}

export default x_city
