import React, { useEffect, useState } from 'react'
import MyTransactions from '../components/Me/MyTransactions'
import ShowGroups from '../components/Me/ShowGroups'
import Statics from '../components/Me/Statics'
import statics from '../src/assets/statics.png'
import { h1Header, hraderStyle } from '../styles/styles'
import MeContext from '../contexts/MeContext'
import axios from 'axios'
import LastTransactions from '../components/Me/LastTransactions'
import { InvitesList } from '../components/Me/InvitesList '




function Me() {

    const [stats, setStats] = useState([])
    const [last5Transactions, setLast5Transactions] = useState([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        try {
            setLoading(true)
            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/transactions/user-statics`)
                .then(res => {
                    console.log(res.data);

                    setStats(res.data)
                    setLast5Transactions(res.data.last5Tranactions)

                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.error("Error fetching data:", error);
        }


    }, [])




    return (
        <MeContext.Provider value={{ stats, setStats, last5Transactions, setLast5Transactions, loading, setLoading }}>

            <div className='flex flex-col-reverse   max-lg:flex-col-reverse max-lg:items-center   items-center justify-center w-full  '>


                <div className="relative isolate overflow-hidden bg-white  flex-grow w-full">
                    <img
                        alt=""
                        src={statics}
                        className="absolute inset-0 -z-10 size-full object-cover object-top-right md:object-center"
                    />

                    <div className='flex flex-col items-center  border-indigo-700/50   max-lg:mt-4 rounded-md '>
                        <div className='flex flex-col max-xl:flex-col  items-start justify-center w-full'>

                            <ShowGroups />
                            <InvitesList/>
                            <LastTransactions />
                            <Statics />
                        </div>




                    </div>

                </div>




            </div>
        </MeContext.Provider>

    )
}

export default Me
