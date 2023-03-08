import React from 'react'
import {Card} from "antd";

const HyperLinkToGithub = ({fullName})=>(
  <a href={`https://github.com/${fullName}`}>{fullName}</a>
)

const StarCard = ({data})=>{
  return (
    <Card
      title={<HyperLinkToGithub fullName={data.fullName} />}
    >
      <p>{data.description}</p>

    </Card>
  )
}

export {StarCard}