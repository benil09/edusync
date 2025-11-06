import React from 'react'
import PollComponent from '../../Components/PollComponent'

const Poll = () => {
  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6">
        Polls
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full justify-items-center auto-rows-auto">
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
        <div className="w-full max-w-[calc(100%-1rem)]">
          <PollComponent />
        </div>
      </div>
    </div>
  )
}

export default Poll
