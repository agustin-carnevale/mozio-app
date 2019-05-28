import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

export default (Component) =>
  withRouter((props) => {
    const queryParams = queryString.parse(props.location.search)

    return <Component query={queryParams} {...props} />
  })
