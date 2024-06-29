import React from 'react'

const PatientHeader = ({ patientDetails }) => {

    return (
        <header className='flex flex-col justify-between px-2 py-1 border-b-4   border-blue-500'>
            <h3 className="text-lg font-bold dark:text-white">{patientDetails.name}
            </h3>
            <p className='text-sm font-normal'> Registration Number : {patientDetails.registrationNo}</p>
            <div className='flex flex-row justify-between'>
                <p className="text-base font-normal dark:text-white">{patientDetails.age} | {patientDetails.gender}</p>
                <p className="text-base font-normal dark:text-white">Diagnosis : Fever</p>
            </div>
        </header>
    )
}

export default PatientHeader