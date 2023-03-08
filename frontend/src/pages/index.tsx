import useSWR from 'swr'
import {Alert, Spin, Card, Statistic, Row, Col} from "antd";
import React, {useEffect, useState} from "react";
import {Header} from "@/components/Header";
import {StarCard} from "@/components/StarCard";

const NowCards = ({data}) => {
  const totalCount = data.length
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Current Stars"
            value={totalCount}
          />
        </Card>
      </Col>
    </Row>
  )
}

const StarCards = ({data}) => {
  return (
    <>
      {data.map((starData) => (<StarCard data={starData}/>))}
    </>
  )
}

const StarsListNow = () => {
  const {data, error, isLoading} = useSWR('/api/list', (...args) => fetch(...args).then(res => res.json()))
  if (isLoading) return <Spin/>
  if (error) return <Alert message="loading error" type="error"/>
  return (
    <div id={"starsListNow"}>
      <div id={"now-card"}>
        <NowCards data={data}/>
      </div>
      <div id={"star-cards"}>
        <StarCards data={data}/>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      <Header currentLocation={"star"}/>
      <StarsListNow/>
    </div>
  );
}