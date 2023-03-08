import React from 'react'
import useSWR from "swr";

const StarContent = () => {
  const {data, error, isLoading} = useSWR('/api/history', (...args) => fetch(...args).then(res => res.json()))
  return (
    <div id="StarContent" >

    </div>
  )
}

export {StarContent}