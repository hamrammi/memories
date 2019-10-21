import React from 'react'

export default function ErrorAlert ({ message }) {
  return (
    <div className="alert alert-danger border-0 shadow-sm">
      <h6 className="alert-heading"><strong>Oooops!</strong></h6>
      { message || 'Error' }
    </div>
  )
}
