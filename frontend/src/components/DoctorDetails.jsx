import React, { Fragment } from 'react'
import RxLogo from "@/assets/rx-logo.png";

const DoctorDetails = ({ doctorDetails }) => {

    return (
        <Fragment>
            <div className='flex flex-row justify-between px-2 border-b-4 border-b-blue-500 '>
                <header className='flex flex-row justify-start gap-4 py-1'>
                    <img alt={"Rx Logo"} src={RxLogo} className='w-10 h-10 mt-2' />
                    <div>
                        <h3 className="text-base font-semibold dark:text-white">{doctorDetails.name}</h3>
                        <p className='text-sm font-normal'> Registration Number : {doctorDetails.registrationNumber}</p>
                        <p className="text-base font-normal dark:text-white">{doctorDetails.qualification} | {doctorDetails.speciality}</p>
                        <p className="text-base font-normal dark:text-white"></p>
                        <p className="text-base font-normal dark:text-white">{doctorDetails.address}</p>
                        <div className='flex flex-row justify-between'>
                            <p className="text-base font-normal dark:text-white">{doctorDetails.mobileNumber}</p>
                        </div>
                    </div>
                </header>
                <p className='text-base font-medium underline'>1:25pm, 24 June, 2024</p>
            </div>
        </Fragment>
    )
}

export default DoctorDetails