<div key={transaction.transaction_id} className="px-4 py-5 sm:p-6 flex justify-between w-full items-center bg-indigo-100/5 my-2  rounded-2xl  ">
{!loading ? <span className="flex items-baseline text-xl font-normal text-indigo-6000"> ID: {transaction.transaction_id}</span> :
    <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-indingo-600 font-semibold"></span>
    </div>
}
{!loading ? <dt className="text-base font-bold  text-gray-900">{transaction.group_title}</dt> :
    <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-indingo-600 font-semibold"></span>
    </div>
}
{!loading ? <span className="flex items-baseline text-xl font-normal text-indigo-6000">  {dayjs(transaction.created_at).format('YYYY MMM D HH:mm')}</span> :
    <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-indingo-600 font-semibold"></span>
    </div>
}

{!loading ? <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
    <div className="flex items-baseline text-2xl font-semibold text-indigo-800">
        {transaction.amount}
    </div>

    <div
        className={classNames(
            'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
        )}
    >



    </div>
</dd> :
    <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-indingo-600 font-semibold"></span>
    </div>
}
</div>