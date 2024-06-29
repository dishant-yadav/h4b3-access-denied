import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import React from 'react'

const Appointments = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-[84%] h-screen">
        <Topbar name="APPOINTMENTS"/>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            Appointments
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments