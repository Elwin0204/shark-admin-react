import { Spin } from "antd";
import React, { Suspense } from "react";

// 定义加载时的样式
const loadingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};


const lazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={ loadingStyle }
        />
      }
    >
      <Component />
    </Suspense>
  )
};

export default lazyLoad;