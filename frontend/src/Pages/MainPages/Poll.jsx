import React from 'react'
import PollComponent from '../../Components/PollComponent'

const Poll = () => {
  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6">
        Polls
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 justify-items-center">
        <PollComponent />
        <PollComponent />
        <PollComponent />
        <PollComponent />
        <PollComponent />
        <PollComponent />
        <PollComponent />
        <PollComponent />
      </div>
    </div>
  )
}

export default Poll
