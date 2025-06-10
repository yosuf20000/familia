import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react';
import dayjs from 'dayjs';
import { CiEdit } from "react-icons/ci";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GroupMembers({ ...group }, key) {
  console.log(group);
  



  return (
    <div className="flow-root border-b-4 border-indigo-800 rounded-2xl p-2  ">
      <div className='flex justify-between w-full  bg-indigo-800/80 rounded-md '>

        <h1 className='  my-2 p-2 rounded-sm text-white font-bold '>{group?.groupTitle}</h1>
        <h1 className=' my-2 p-2 rounded-sm text-white font-bold '>12</h1>
        <span className='  self-stretch  relative flex items-center w-10 justify-center text-xl  bg-black/40 hover:bg-black/10 rounded-sm text-white font-bold '><CiEdit className='' />
        </span>
      </div>

      <ul role="list" className="-mb-8">
        {group.members.map((member, index) => (
          <li key={key}>
            <div className="relative pb-8  ">
              {/* {index !== group.members.length - 1 ? (
                <span aria-hidden="true" className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
              ) : null} */}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(

                      'flex size-8 items-center justify-center rounded-full ring-8 ring-white bg-gray-400',
                    )}
                  >
                    <UserIcon aria-hidden="true" className="size-5 text-white " />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-bold text-indigo-700">
                      {member?.fname}{' '}
                      {/* <a href={event.href} className="font-medium text-gray-900">
                        {event.target}
                      </a> */}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {/* <time dateTime={member?.joiningDate}>{member?.joiningDate}</time> */}
                    <p className='font-bold'>Joined: {dayjs(member.joiningDate).format('MMMM D, YY')}</p>
                  </div>
                  <span className="inline-flex items-center gap-x-0.5 rounded-md  px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">

                    <button type="button" className="group relative  size-3.5 rounded-xs hover:bg-red-600/20 ">
                      <span className="sr-only">Remove</span>
                      <svg viewBox="0 0 14 14" className="size-3.5 stroke-red-600/50 group-hover:stroke-red-600/75">
                        <path d="M4 4l6 6m0-6l-6 6" />
                      </svg>
                      <span className="absolute -inset-1" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}