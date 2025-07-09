import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

function OrangeAlert({title, option}) {
  return (
    <div className="border-r-8 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex w-full">
        <div className="shrink-0 ">
        </div>
        <div className="ml-3 w-full gap-4 flex justify-end items-center ">
          <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400 text-right" />
          <p className="text-sm text-yellow-700 text-right ">
            {title}.{' '}
            <a href="#" className="font-medium text-yellow-700 underline hover:text-yellow-600">
              {option}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrangeAlert
