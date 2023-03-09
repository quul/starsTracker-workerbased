import React, {useState} from 'react'
import {Header} from "@/components/Header";
import useSWR from "swr";
import {DatePicker, Alert, Spin} from "antd";
import {Line} from '@ant-design/charts'

import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import minMax from 'dayjs/plugin/minMax';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(minMax)
dayjs.extend(isBetween)

const DisplayPeriodSelector = ({displayPeriod, setDisplayPeriod, earliestDay}) => {
  const {RangePicker} = DatePicker
  const onDateRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setDisplayPeriod(dates)
    }
    setDisplayPeriod([dayjs(), dayjs()])
  }

  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs]
  }[] = [
    {label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()]},
    {label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()]},
    {label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()]},
    {label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()]},
    {label: 'All Data', value: [earliestDay, dayjs()]}
  ];

  return (<RangePicker presets={rangePresets} onChange={onDateRangeChange} defaultValue={displayPeriod}/>)
}

/* Which kind of charts do I need?
- Star Count History
-

 */
const HistoryChart = ({data}) => {

}

const HistoryList = ({data}) => {
  return (<div>

  </div>)
}
const HistoryDisplayView = ({data}) => {
  const [displayPeriod, setDisplayPeriod] = useState([dayjs().add(-7, 'd'), dayjs()])
  const daysWithData = data[0].map(keys => dayjs(keys.split(':')[2]))
  const earliestDay = dayjs.min(daysWithData)
  const displayedData = data[1].filter((diffInfo, index) =>
    dayjs(daysWithData[index]).isBetween(displayPeriod[0], displayPeriod[1], 'day', "[]"))
  return (<>
    <DisplayPeriodSelector {...{displayPeriod, setDisplayPeriod, earliestDay}}/>
    <HistoryChart data={displayedData}/>
    <HistoryList data={displayedData}/>
  </>)
}

export default function HistoryPage() {
  const {data, error, isLoading} = useSWR('/api/history', (...args) => fetch(...args).then(res => res.json()))
  if (isLoading) return <Spin/>
  if (error) return <Alert message="loading error" type="error"/>

  return (
    <>
      <Header currentLocation={"history"}/>
      <HistoryDisplayView data={data}/>
    </>
  )
}