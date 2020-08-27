import React, {Fragment, memo, lazy, Suspense } from 'react';
import {renderRoutes} from 'react-router-config';
import styles from './index.module.less';
import {WingBlank} from 'antd-mobile';
import { useState } from 'react';

const RankComponents = lazy(() => import("@/views/rank/"));
const SingersComponents = lazy(() => import("@/views/singers/"));
const RecommendComponents = lazy(() => import("@/views/recommend/"));

const SuspenseComponent = (key) => {
  let Component = {}
  switch (key) {
    case 'rank':
      Component = RankComponents;
      break;
    case 'singers':
      Component = SingersComponents;
      break;
    default:
      Component = RecommendComponents;
      break;
  }
  return (
    <Suspense fallback={null}>
      <Component></Component>
    </Suspense>
  )
}

const homeLayout = memo((props) => {
  const {route} = props;
  const [tabState, setTabState] = useState('recommend')
  const navTo = (path) => {
    props.history.push(path)
  }
  return (
    <Fragment>
      {renderRoutes(route.routes)}
      <div className={styles["header"]}>
        <WingBlank>
          <div className={styles.top}>
            <i className='iconfont icon-caidan'></i>
            <span className={styles.title}>M</span>
            <i className='iconfont icon-sousuo' onClick={() => navTo('/search')}></i>
          </div>
          <div className={styles['tabBar']}>
            <span className={(styles.tabBarItem, tabState === 'recommend' ? styles.selected : '')} onClick={() => {setTabState('recommend')}}>
              推荐
            </span>
            <span className={(styles.tabBarItem, tabState === 'rank' ? styles.selected : '')} onClick={() => {setTabState('rank')}}>
              排行榜
            </span>
            <span className={(styles.tabBarItem, tabState === 'singers' ? styles.selected : '')}  onClick={() => {setTabState('singers')}}>
              歌手
            </span>
          </div>
        </WingBlank>
      </div>
      <div className={styles.main} style={{display: tabState === 'rank' ? 'block' : 'none'}}>
        {SuspenseComponent('rank')}
      </div>
      <div className={styles.main} style={{display: tabState === 'singers' ? 'block' : 'none'}}>
        {SuspenseComponent('singers')}
      </div>
      <div className={styles.main} style={{display: tabState === 'recommend' ? 'block' : 'none'}}>
        {SuspenseComponent('recommend')}
      </div>
    </Fragment>
  );
});

export default homeLayout;