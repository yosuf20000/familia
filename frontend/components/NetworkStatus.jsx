import React, { useEffect, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/20/solid'

function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
    return (
        <div className='fixed bottom-2 z-200 w-4/6  bg-red-700/40'>
            {!isOnline &&<div className="rounded-md  p-4  ">
                <div className="flex flex-row-reverse gap-2">
                    <div className="shrink-0">
                        <XCircleIcon aria-hidden="true" className="size-5 text-white" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm  font-bold text-right text-white  w-full">مافيه نت شكله باقت النت خلصت. حاول تجددها </h3>
                        {/* <div className=" text-sm text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default NetworkStatus
