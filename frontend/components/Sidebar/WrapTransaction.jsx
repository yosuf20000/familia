import React, { useContext, useState } from 'react'
import AddTransaction from '../AddTransaction'
import { PlusIcon } from '@heroicons/react/20/solid'
import Context from '../../sections/Context'
import { SelectedGroupContext } from '../Layout'
import { useGroupAccess } from '../../contexts/GroupAccessContext'


function WrapTransaction() {
    // const [openDialog, setOpenDialgo] = useState(false)
            const {

                openDialog,
                setOpenDialgo
    
    
            } = useGroupAccess();
  return (
    <div className="text-center">

    {/* <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
    <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p> */}
    <div className="">
        <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => { setOpenDialgo(true) }}
        >
            <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
            توثيق حوالة
        </button>

            <AddTransaction

                openDialog={openDialog}
                setOpenDialgo={() => setOpenDialgo(false)}


            />
    </div>
</div>
  )
}

export default WrapTransaction
