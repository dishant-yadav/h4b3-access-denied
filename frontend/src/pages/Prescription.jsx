import React, { Fragment, useState } from 'react'
import ReactDOMServer from 'react-dom/server';
import { useParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DoctorDetails from '@/components/DoctorDetails'
import PatientDetails from '@/components/PatientDetails'
import PrescriptionBody from '@/components/PrescriptionBody'
import { prescriptions } from '@/data'
import SelectInput from '@/components/ui/SelectInput';

const Prescription = () => {

  const { prescId } = useParams();
  const dataFromAPI = {
    "patient": {
      "id": 2,
      "registrationNo": 12,
      "name": "Patient 1",
      "dateOfBirth": "1990-01-01",
      "age": 31,
      "gender": "Female",
      "mobileNumber": "+1234567891",
      "address": "Address 2",
      "height": 171,
      "heightUnit": "cm",
      "weight": 61,
      "weightUnit": "kg"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. John Smith",
      "qualification": "MD",
      "speciality": "Cardiologist",
      "address": "Hospital Address 1",
      "registrationNumber": "DOC1000",
      "mobileNumber": "+9876543210",
      "hospitalName": "Hospital 1",
      "age": 45,
      "country": "USA",
      "description": "Dr. John Smith has over 20 years of experience in cardiology and is known for his patient-centered approach.",
      "linkedin": "https://www.linkedin.com/in/drjohnsmith",
      "twitter": "https://twitter.com/drjohnsmith",
      "facebook": "https://www.facebook.com/drjohnsmith",
      "image": "/assets/doctor.jpg"
    },
  }

  const { patient: patientData, doctor: doctorDetails, } = dataFromAPI


  const [newComplaint, setNewComplaint] = useState("");
  const [newTest, setNewTest] = useState("");
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: {
      morning: "0",
      afternoon: "0",
      night: "0"
    },
    duration: ""
  });

  const [diagnosisData, setDiagnosisData] = useState({
    "diagnosis": "",
    "complaints": [],
    "tests": [],
    "notes": "",
    "medicines": []
  });

  const handleDiagnosis = (e) => {
    setDiagnosisData((prevData) => ({
      ...prevData,
      diagnosis: e.target.value
    }));
  }

  const handleAddComplaint = () => {
    if (newComplaint.trim() !== "") {
      setDiagnosisData(prevData => ({
        ...prevData,
        complaints: [...prevData.complaints, newComplaint]
      }));
      setNewComplaint("");
    }
  };

  const handleRemoveComplaint = (index) => {
    setDiagnosisData(prevData => ({
      ...prevData,
      complaints: prevData.complaints.filter((_, i) => i !== index)
    }));
  };

  const handleAddTest = () => {
    if (newTest.trim() !== "") {
      setDiagnosisData(prevData => ({
        ...prevData,
        tests: [...prevData.tests, newTest]
      }));
      setNewTest("");
    }
  };

  const handleRemoveTest = (index) => {
    setDiagnosisData(prevData => ({
      ...prevData,
      tests: prevData.tests.filter((_, i) => i !== index)
    }));
  };

  const handleAddMedicine = () => {
    if (newMedicine.name.trim() !== "" && newMedicine.duration.trim() !== "") {
      setDiagnosisData(prevData => ({
        ...prevData,
        medicines: [...prevData.medicines, {
          ...newMedicine,
          dosage: `${newMedicine.dosage.morning}-${newMedicine.dosage.afternoon}-${newMedicine.dosage.night}`
        }]
      }));
      setNewMedicine({
        name: "",
        dosage: {
          morning: "0",
          afternoon: "0",
          night: "0"
        },
        duration: ""
      });
    }
  };

  const handleRemoveMedicine = (index) => {
    setDiagnosisData(prevData => ({
      ...prevData,
      medicines: prevData.medicines.filter((_, i) => i !== index)
    }));
  };

  const handleNotes = (e) => {
    setDiagnosisData((prevData) => ({
      ...prevData,
      notes: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Diagnosis Data:', diagnosisData);
    pdfHandler()
  };

  const PrescriptionPrint = () => {
    return (
      <section>
        <DoctorDetails doctorDetails={doctorDetails} />
        <PatientDetails patientDetails={patientData} />
        <PrescriptionBody prescriptionDetails={diagnosisData} />
      </section>)
  }

  const pdfHandler = () => {
    const printElement = ReactDOMServer.renderToString(PrescriptionPrint());
    html2pdf().from(printElement).save();
  }

  return (
    <div className='flex flex-col h-full justify-center items-center py-4 px-8 bg-gray-100'>
    <img src='/assets/doctor1.png' className='absolute top-0 left-0 drop-shadow-lg shadow-black  '/>
    <img src='/assets/doctor2.png' className='absolute top-56 right-0 drop-shadow-lg shadow-black  '/>
      <h1 className="block text-2xl font-semibold text-black my-4 px-6">Patient Prescription Form</h1>
      <div className='rounded-3xl w-1/2 px-6 py-4 flex flex-col justify-start items-center'>
        <Form onSubmit={handleSubmit} className="">
          <div className='mb-4 w-full shadow-lg rounded-lg px-5 py-4 bg-white'>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Diagnosis
            </label>
            <Input
              value={diagnosisData.diagnosis}
              onChange={handleDiagnosis}
              className="mt-1 block w-full border-black/80 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter diagnosis details.."
            />
          </div>

          <div className='mb-4 w-full shadow-lg rounded-lg px-5 py-4 bg-white'>
            <label htmlFor="complaints" className="block text-sm font-medium text-gray-700">
              Complaints
            </label>
            <div className="flex items-center">
              <Input
                value={newComplaint}
                onChange={(e) => setNewComplaint(e.target.value)}
                className="mt-1 block w-full border-black/80 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter patient complaints.."
              />
              <Button type="button" className="ml-2 bg-blue-500 hover:bg-blue-600" onClick={handleAddComplaint}>Add</Button>
            </div>
            <ul className="mt-2">
              {diagnosisData?.complaints?.map((complaint, index) => (
                <li key={index} className="flex justify-between items-center text-sm font-medium bg-gray-200 py-2 px-4 my-2 rounded-lg">
                  {complaint}
                  <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={() => handleRemoveComplaint(index)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-4 w-full shadow-lg rounded-lg px-5 py-4 bg-white'>
            <label htmlFor="complaints" className="block text-sm font-medium text-gray-700">
              Tests
            </label>
            <div className="flex items-center">
              <Input
                value={newTest}
                onChange={(e) => setNewTest(e.target.value)}
                className="mt-1 block w-full border-black/80 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter tests to be performed by the patient.."
              />
              <Button type="button" className="ml-2 bg-blue-500 hover:bg-blue-600" onClick={handleAddTest}>Add</Button>
            </div>
            <ul className="mt-2">
              {diagnosisData?.tests?.map((test, index) => (
                <li key={index} className="flex justify-between items-center text-sm font-medium bg-gray-200 py-2 px-4 my-2 rounded-lg">
                  {test}
                  <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={() => handleRemoveTest(index)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-4 w-full shadow-lg rounded-lg px-5 py-4 bg-white'>
            <label htmlFor="medicines" className="block text-sm font-medium text-gray-700">
              Medicines
            </label>
            <div className='mb-3'>
              <Input
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                placeholder="Medicine Name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className='mb-3'>
              <label className="block text-sm font-medium text-gray-700">Dosage</label>
              <div className="flex flex-row justify-between items-center gap-2">
                <div>
                  <label htmlFor="" className='text-sm font-medium'>Morning</label>
                  <SelectInput placeholder={"Medicine/No Medicine"} width={180} options={[
                    {
                      name: "No Medicine", value: 0,
                    },
                    {
                      name: "Medicine", value: 1,
                    }
                  ]} />
                </div>
                <div>
                  <label htmlFor="" className='text-sm font-medium'>Afternoon</label>
                  <SelectInput placeholder={"Medicine/No Medicine"} className=""   options={[
                    {
                      name: "No Medicine", value: 0,
                    },
                    {
                      name: "Medicine", value: 1,
                    }
                  ]} />
                </div>
                <div>
                  <label htmlFor="" className='text-sm font-medium'>Night</label>
                  <SelectInput placeholder={"Medicine/No Medicine"} width={180} options={[
                    {
                      name: "No Medicine", value: 0,
                    },
                    {
                      name: "Medicine", value: 1,
                    }
                  ]} />
                </div>
              </div>
            </div>
            <div className='mb-3 mt-1'>
              <Input
                value={newMedicine.duration}
                onChange={(e) => setNewMedicine({ ...newMedicine, duration: e.target.value })}
                placeholder="Duration"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className='flex flex-row justify-end'>

              <Button type="button" className="mb-2 w-full bg-blue-500 hover:bg-blue-600" onClick={handleAddMedicine}>Add Medicine</Button>
            </div>
            <ul className="mt-2">
              {diagnosisData?.medicines?.map((medicine, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 py-2 px-4 my-1 rounded-lg">
                  <div>
                    <p className='text-sm font-medium'>{medicine.name}</p>
                    <p className='text-sm font-medium'>{medicine.dosage}</p>
                    <p className='text-sm font-medium'>{medicine.duration}</p>
                  </div>
                  <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={() => handleRemoveMedicine(index)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-4 w-full shadow-lg rounded-lg px-5 py-4 bg-white'>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Consultation Notes
            </label>
            <Input
              value={diagnosisData.notes}
              onChange={handleNotes}
              className="mt-1 block w-full border-black/80 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter consultation notes.."
            />
          </div>

          <Button className="mt-2 bg-blue-500 hover:bg-blue-600 w-full text-lg shadow-lg" type="submit"  onClick={handleSubmit} >Generate Prescription</Button>
        </Form>
      </div>
    </div>
  )
}

export default Prescription