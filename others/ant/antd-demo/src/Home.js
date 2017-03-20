import React, { Component } from 'react';
import { Tabs } from 'antd';
import List from './List.js';

const TabPane = Tabs.TabPane;


/*
    *        1 =>  头条
    *        2 =>  娱乐
    *        3 =>  军事
    *        4 =>  汽车
    *        5 =>  财经
    *        6 =>  笑话
    *        7 =>  体育
    *        8 =>  科技
*/


class Home extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="头条" key="1"><List tabType={1} /></TabPane>
        <TabPane tab="娱乐" key="2"><List tabType={2} /></TabPane>
        <TabPane tab="军事" key="3"><List tabType={3} /></TabPane>
        <TabPane tab="汽车" key="4"><List tabType={4} /></TabPane>
        <TabPane tab="财经" key="5"><List tabType={5} /></TabPane>
        <TabPane tab="笑话" key="6"><List tabType={6} /></TabPane>
        <TabPane tab="体育" key="7"><List tabType={7} /></TabPane>
        <TabPane tab="科技" key="8"><List tabType={8} /></TabPane>
      </Tabs>
    );
  }
}

export default Home;
