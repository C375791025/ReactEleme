import React, { Component } from 'react'
import {Link,Route,withRouter} from 'react-router-dom'

import X_city from './x_city'
import X_homepage from './x_homepage'

export class one extends Component {
    constructor(props) {
      super(props)
      this.state = {
         
      }
    }

    render() {
        return (
            <div>
                <section>
                    {/*设置默认路由*/}
                    <Route exact path="/" component={X_city}/>
                    <Route  path="/x_city" component={X_city}/>
                    <Route  path="/x_homepage" component={X_homepage}/>
                </section>
            </div>
        )
    }
}

export default one
