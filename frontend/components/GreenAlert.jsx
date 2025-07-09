import React from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

function GreenAlert({title}) {
  return (
<div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="shrink-0">
        </div>
        <div className="ml-3 flex gap-4  justify-end w-full">
          <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
          <p className="text-sm font-medium text-green-800">{title}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 focus:outline-hidden"
            >
              {/* <span className="sr-only">Dismiss</span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreenAlert
