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
    <div className='flex flex-col h-screen w-screen justify-center items-center p-2'>
      <h1 className="block text-lg font-medium text-gray-700 my-4">Patient Prescription Form</h1>
      <div className='border-2 border-black rounded-3xl w-1/3 px-6 py-4 flex flex-col justify-center items-center'>
        <Form onSubmit={handleSubmit} className="">
          <div className='mb-2 w-full'>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Diagnosis
            </label>
            <Input
              value={diagnosisData.diagnosis}
              onChange={handleDiagnosis}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className='mb-2 w-full'>
            <label htmlFor="complaints" className="block text-sm font-medium text-gray-700">
              Complaints
            </label>
            <div className="flex items-center">
              <Input
                value={newComplaint}
                onChange={(e) => setNewComplaint(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Button type="button" className="ml-2" onClick={handleAddComplaint}>Add</Button>
            </div>
            <ul className="mt-2">
              {diagnosisData?.complaints?.map((complaint, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 my-1 rounded">
                  {complaint}
                  <Button type="button" onClick={() => handleRemoveComplaint(index)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-2 w-full'>
            <label htmlFor="complaints" className="block text-sm font-medium text-gray-700">
              Tests
            </label>
            <div className="flex items-center">
              <Input
                value={newTest}
                onChange={(e) => setNewTest(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Button type="button" className="ml-2" onClick={handleAddTest}>Add</Button>
            </div>
            <ul className="mt-2">
              {diagnosisData?.tests?.map((test, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 my-1 rounded">
                  {test}
                  <Button type="button" onClick={() => handleRemoveTest(index)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-2 w-full'>
            <label htmlFor="medicines" className="block text-sm font-medium text-gray-700">
              Medicines
            </label>
            <div className='mb-2'>
              <Input
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                placeholder="Medicine Name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className='mb-2'>
              <label className="block text-sm font-medium text-gray-700">Dosage</label>
              <div className="flex flex-row justify-between items-center gap-2">
                <div>
                  <label htmlFor="">Morning</label>
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
                  <label htmlFor="">Afternoon</label>
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
                  <label htmlFor="">Night</label>
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
            <div className='mb-2'>
              <Input
                value={newMedicine.duration}
                onChange={(e) => setNewMedicine({ ...newMedicine, duration: e.target.value })}
                placeholder="Duration"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className='flex flex-row justify-end'>

              <Button type="button" className="mb-2" onClick={handleAddMedicine}>Add Medicine</Button>
            </div>
            <ul className="mt-2">
              {diagnosisData?.medicines?.map((medicine, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 my-1 rounded">
                  <div>
                    <p>{medicine.name}</p>
                    <p>{medicine.dosage}</p>
                    <p>{medicine.duration}</p>
                  </div>
                  <Button type="button" onClick={() => handleRemoveMedicine(index)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-2 w-full'>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Consultation Notes
            </label>
            <Input
              value={diagnosisData.notes}
              onChange={handleNotes}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <Button className="mt-2" type="submit" onClick={handleSubmit} >Generate Prescription</Button>
        </Form>
      </div>
    </div>
  )
}

export default Prescription