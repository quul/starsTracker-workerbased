import yayJpg from '../assets/yay.jpg';
import useSWR from 'swr'
import {Alert, Spin} from "antd";
import React from "react";

const StarsStatistics = ():React.FC => {
  return (
    <>
    </>
  )
}

export default function HomePage() {
  const {data, error, isLoading} = useSWR('/', (...args) => fetch(...args).then(res => res.json()))
  if (isLoading) return <Spin />
  if (error) return <><Alert message="loading error" type="error" /> </>
  return (
    <div>
      <div>

      </div>
    </div>
  );
}