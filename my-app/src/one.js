import React, { Component } from 'react'
import CdyLogin from './cdyLogin'
import CdyHome from './cdyHome'
import {Route} from 'react-router-dom'

export class one extends Component {
    constructor(props) {
      super(props)
      this.state = {
         
      }
    }

    render() {
        return (
            <div>
                <Route exact  path="/" component={CdyLogin}/>
                <Route path="/cdyHome" component={CdyHome}/> 
            </div>
        )
    }
}

export default one
