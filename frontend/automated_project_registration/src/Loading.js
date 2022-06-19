import React, { Component } from 'react'
import loading from './ZZ5H.gif'
export default class Loading extends Component {
    render() {
        return (
            <div className='text-center'>
                <img style={{height: "52px"}} src={loading} alt="#" />
            </div>
        )
    }
}
