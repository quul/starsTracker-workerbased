import yayJpg from '../assets/yay.jpg';
import useSWR from 'swr'
import {Alert, Spin} from "antd";
import React, {useEffect, useState} from "react";

const StarsStatistics = (): JSX.Element => {
  return (
    <>
      <div>test</div>
    </>
  )
}

export default function HomePage() {
  const {data, error, isLoading} = useSWR('/api/list', (...args) => fetch(...args).then(res => res.json()))
  if (isLoading) return <Spin/>
  if (error) return <Alert message="loading error" type="error"/>

  const {
    data: historyData,
    error: historyError,
    isLoading: isHistoryLoading
  } = useSWR('/api/history', (...args) => fetch(...args).then(res => res.json()))
  const [displayedHistoryData, setDisplayedHistoryData] = useState(null)
  useEffect(() => {
    if (!isHistoryLoading) {
      historyData.forEach((historys: any) => {
      })
    }
  }, [historyData])

  return (
    <div>
      <div>

      </div>
    </div>
  );
}