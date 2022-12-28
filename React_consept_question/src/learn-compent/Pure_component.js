   // shouldcomponent upadet==========> like 
import React, { Component,PureComponent } from 'react'

export default class Pure_component extends PureComponent { //purecomponet ni jagaye coponent laki joy leje
    constructor() {
        super()
        this.state = {
            count: 1
        }
    }
    
    render() {
        console.log('re rendering');

        return (
            <div>
                <h1>count : {this.state.count}</h1>
                <button onClick={() => this.setState({count:this.state.count + 1})}>upadate count</button>
                <button onClick={() => { }}>mmmm</button>
                <button></button>
                <button onClick={() => this.setState({count:this.state.count})}>upadate count</button>
                {/* now at this line satte will not change onclcik but still render is happing ---if i not use pure componrnt */}
            </div>
        )
    }
}
