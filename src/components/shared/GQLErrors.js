import React from 'react'

export function GQLErrors ({ errors }) {
  if (errors.length === 0) {
    return null
  }

  return (
    <div className="alert alert-danger rounded-lg shadow-sm">
      {errors.map((error, errIdx) => (
        <div key={'err-' + errIdx}>
          <p><strong>{error.message}</strong></p>
          {error.errors && Object.values(error.errors).map((errMsg, msgIdx) => (
            <div key={'msg-' + msgIdx}>{ errMsg }</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function transformGQLError (gqlError) {
  return gqlError.graphQLErrors.map(({ message, extensions }) => ({
    message,
    errors: extensions.errors
  }))
}
