import React from 'react'
import {Segmented} from "antd";
import {history} from 'umi';
import {HistoryOutlined, StarOutlined} from "@ant-design/icons";

enum LocationTypes {
  star = "star",
  history = "history",
}

const Header = ({currentLocation}: { currentLocation: LocationTypes }) => {

  const onSegmentedChanged = (value: string) => {
    if (value === 'star') history.push('/')
    else if (value === 'history') history.push('/history')
  }

  return (
    <div id="header">
      <Segmented
        options={[
          {label: 'Star', value: 'star', icon: <StarOutlined/>},
          {label: 'History', value: 'history', icon: <HistoryOutlined/>}
        ]}
        onChange={onSegmentedChanged}
        defaultValue={currentLocation}/>
    </div>
  )
}

export {Header}