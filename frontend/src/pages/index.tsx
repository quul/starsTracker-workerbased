import useSWR from 'swr'
import {Alert, Spin, Card, Statistic, Row, Col, Pagination} from "antd";
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
  const totalCount = data.length

  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const onPaginationChanged = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  const shownData = data.slice((currentPage-1)*pageSize, currentPage*pageSize)
  return (
    <>
      {shownData.map((starData) => <StarCard key={starData.name} data={starData}/>)}
      <Pagination
        total={totalCount}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        defaultPageSize={pageSize}
        defaultCurrent={currentPage}
        onChange={onPaginationChanged}
      />
    </>
  )
}

const StarsListNow = () => {
  const {data, error, isLoading} = useSWR('/api/list', (...args) => fetch(...args).then(res => res.json()))
  if (isLoading) return <Spin/>
  if (error) return <Alert message="loading error" type="error"/>
  const dataParsed = JSON.parse(data)
  return (
    <div id={"starsListNow"}>
      <div id={"now-card"}>
        <NowCards data={dataParsed}/>
      </div>
      <div id={"star-cards"}>
        <StarCards data={dataParsed}/>
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