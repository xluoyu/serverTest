import React, { memo } from 'react';
import './index.css'
import { useEffect } from 'react';
import homeContext from '@/utils/homeContext'

const itemFn = (num) => {
  console.log('渲染')
  let res = []
  for(let i = 0; i < num; i++) {
    res.push((<p key={i}>{i}</p>))
  }
  return res
}

const index = memo((props) => {
  useEffect(() => {
    console.log(props)
  })
  return (
    <div className='main'>
      {
        itemFn(100)
      }
    </div>
  );
});
index.contextType = homeContext

export default index;