import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Home from './Home'
import My from './My'
import Cart from './Cart'
import { TabBar } from 'antd-mobile';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
      fullScreen: true,
    };
  }
  componentDidMount() {
    let selectedTab = this.props.location.pathname
    this.setState({selectedTab})
  }
  showView (route) {
    this.props.history.push(route)
  }
  render() {
    return (
      <Fragment>
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="商城"
            key="Shop"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.props.location.pathname === '/'}
            onPress={() => {
              this.showView('/')
            }}
          >
            <Route path="/" exact component={Home}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="购物车"
            key="Cart"
            selected={this.props.location.pathname === '/cart'}
            onPress={() => {
              this.showView('/cart')
            }}
          >
            <Route path="/cart" exact component={Cart}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="my"
            selected={this.props.location.pathname === '/my'}
            onPress={() => {
              this.showView('/my')
            }}
          >
            <Route path="/my" exact component={My}></Route>
          </TabBar.Item>
        </TabBar>
      </div>
      </Fragment>
    );
  }
}

export default withRouter(Base);