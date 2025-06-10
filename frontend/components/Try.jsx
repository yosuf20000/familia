import React from 'react'

function Try() {
  return (
    <div>
      

      <tbody className="divide-y divide-white/5">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm/6 font-medium text-white">{transaction.fname} {transaction.lname}</div>
                </div>
              </td>
              <td className="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm/6 text-gray-400">{transaction.commit}</div>
                  <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-white/10 ring-inset">
                    {transaction.branch}
                  </div>
                </div>
              </td>
              <td className="py-4 pr-4 pl-0 text-sm/6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <time dateTime={transaction.dateTime} className="text-gray-400 sm:hidden">
                    {transaction.date}
                  </time>

                  <div className="hidden text-white sm:block">{transaction.status}</div>
                </div>
              </td>
              <td className="hidden py-4 pr-8 pl-0 text-sm/6 text-gray-400 md:table-cell lg:pr-20">{transaction.duration}</td>
              <td className="hidden py-4 pr-4 pl-0 text-right text-sm/6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                <time dateTime={transaction.dateTime}>{transaction.date}</time>
              </td>
            </tr>
          ))}
        </tbody>

        <div className={classNames(statuses[transaction.status], 'flex-none rounded-full p-1')}>
                    <div className="size-1.5 rounded-full bg-current" />
                  </div>
    </div>
  )
}

export default Try
