import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import React from 'react'

const Profile = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-[84%] h-screen">
        <Topbar name="PROFILE"/>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            Profile
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile