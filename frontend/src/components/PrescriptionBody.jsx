import React from 'react'

const PrescriptionBody = ({ prescriptionDetails }) => {

    const getSummary = () => {
        const summary = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste atque, omnis veritatis reiciendis sint deserunt dignissimos assumenda tempore, minus ex eligendi itaque. Et illo repellendus vel quas ullam nostrum non cupiditate ipsa eius, velit ad eum nisi dolorem modi magnam esse, nesciunt quidem ratione suscipit itaque porro omnis. Quisquam, doloremque."
        return summary;
    }

    return (
        <main className="mb-auto h-full  px-2 py-2 flex flex-col gap-4">
            <div className="">
                <h1 className='text-base font-semibold'>Complaints</h1>
                {
                    prescriptionDetails.complaints.map((complaint, idx) => {
                        return (
                            <div key={idx}>
                                <p className="border border-black  px-4 py-2">{complaint}</p>
                            </div>
                        )
                    })
                }
            </div>


            <div className="">
                <h1 className='text-base font-semibold'>Clinical Tests</h1>
                {
                    prescriptionDetails.tests.map((test, idx) => {
                        return (
                            <div key={idx}>
                                <p className="border border-black  px-4 py-2">{test}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className="overflow-x-auto">
                <h1 className='text-base font-semibold'>Medicines</h1>
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th className="border border-black px-4 py-2">Name</th>
                            <th className=" border border-black px-4 py-2">Dosage(Morning/Afternoon/Night)</th>
                            <th className="border border-black px-4 py-2">Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prescriptionDetails.medicines.map((medicine, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td className="border border-black  px-4 py-2">{medicine.name}</td>
                                        <td className="border border-black px-4 py-2">{medicine.dosage}</td>
                                        <td className="border  border-black px-4 py-2">{medicine.duration}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className='text-base font-bold'>Consultation Notes</h2>
                <p>{prescriptionDetails.notes}</p>
            </div>
            <div>
                <h2 className='text-base font-bold'>Summary</h2>
                <p>{getSummary()}</p>
            </div>
            <div className='w-full h-1 bg-blue-600 my-1'></div>
        </main>
    )
}

export default PrescriptionBody