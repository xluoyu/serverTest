import React, { Component } from 'react';
import {WingBlank, WhiteSpace, SearchBar, Carousel} from 'antd-mobile';
import AppContext from '@/utils/appContext'

import './index.less'

class Home extends Component {
  static contextType = AppContext
  state = {
    search: '',
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    imgHeight: 176
  }
  search = () => {
    console.log('搜索' + this.state.search)
  }
  onChange = (value) => {
    this.setState({
      search: value
    })
  }
  render() {
    return (
      <div id="home">
        <WhiteSpace/>
        <WingBlank>
          <SearchBar
            placeholder="Search"
            cancelText="搜索"
            onCancel={this.search}
            onChange={this.onChange}
          />
          <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <img
              src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
              alt=""
              key={val}
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          ))}
        </Carousel>
        </WingBlank>
      </div>
    );
  }
}

export default Home;