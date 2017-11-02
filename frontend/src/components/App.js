import React, { Component } from 'react'
import '../w3.css'
import ListPosts from './ListPosts'


class App extends Component {
  render () {
    return (
      <div >
        <div class='w3-bar-item w3-button w3-grey' data-tab='first'>
         <ListPosts />
        </div>
        <div class='w3-bar-item w3-button' data-tab='first'>
          First
        </div>
        <div class='w3-bar-item w3-button' data-tab='second'>
          Second
        </div>
        <div class='w3-bar-item w3-button' data-tab='third'>
          Third
        </div>
      </div>
    )
  }
}

export default App
