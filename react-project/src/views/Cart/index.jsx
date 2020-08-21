import React, { Component, useContext } from 'react';
import {Button, InputItem} from 'antd-mobile';
import AppContext from '@/utils/appContext'

// class Item extends Component {
//   deleteItem = () => {
//     this.props.deleteItem(this.props.value)
//   }
//   render() {
//     return (
//       <div>
//       <p>{this.props.value}</p>
//       <Button onClick={this.deleteItem}>删除</Button>
//       </div>
//     )
//   }
// }

function Item (props) {
  let appContext = useContext(AppContext)
  let deleteItem = () => {
    props.deleteItem(props.value)
  }
  console.log(appContext)
  return (
    <div className="item">
      <p>{props.value}</p>
      <Button onClick={deleteItem}>删除</Button>
      {/* <Button onClick={() => setNum(p => p + 1)}>加</Button> */}
    </div>
  )
}

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      value: ''
    }
  }
  changeValue = (value) => {
    this.setState({value})
  }
  addValue = () => {
    if (!this.state.value) return
    let list = this.state.list
    list.push(this.state.value)
    this.setState({
      list: list,
      value: ''
    })
  }
  deleteItem = (value) => {
    let list = this.state.list.filter(e => e !== value)
    this.setState({list})
  }
  render() {
    return (
      <div>
        <InputItem value={this.state.value} onChange={this.changeValue}/>
        <Button onClick={this.addValue}>添加</Button>
        {this.state.list.map(item => {
          return <Item value={item} key={item} deleteItem={this.deleteItem}></Item>
        })}
      </div>
    );
  }
}

export default index;