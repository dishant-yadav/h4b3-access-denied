const doctors = [
    {
        "id": "66805370e2da3025fb3c403e",
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
        "image": "https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg"
    },
    {
        "id": "2",
        "name": "Dr. Jane Doe",
        "qualification": "MD",
        "speciality": "Neurologist",
        "address": "Hospital Address 2",
        "registrationNumber": "DOC1001",
        "mobileNumber": "+9876543211",
        "hospitalName": "Hospital 2",
        "age": 38,
        "country": "Canada",
        "description": "Dr. Jane Doe is a renowned neurologist with a passion for research and teaching.",
        "linkedin": "https://www.linkedin.com/in/drjanedoe",
        "twitter": "https://twitter.com/drjanedoe",
        "facebook": "https://www.facebook.com/drjanedoe",
        "image": "https://img.freepik.com/free-photo/doctor-preparing-consult_23-2149309941.jpg?w=360&t=st=1719603589~exp=1719604189~hmac=e557cdf6424b755210a67d21afb8b25cae0ae2c38f07241eaca4f88a6ad9936e"
    },
    {
        "id": "3",
        "name": "Dr. Emily Johnson",
        "qualification": "MD",
        "speciality": "Dermatologist",
        "address": "Hospital Address 3",
        "registrationNumber": "DOC1002",
        "mobileNumber": "+9876543212",
        "hospitalName": "Hospital 3",
        "age": 50,
        "country": "UK",
        "description": "Dr. Emily Johnson specializes in treating skin disorders and has published numerous articles in dermatology journals.",
        "linkedin": "https://www.linkedin.com/in/dremilyjohnson",
        "twitter": "https://twitter.com/dremilyjohnson",
        "facebook": "https://www.facebook.com/dremilyjohnson",
        "image": "https://media.istockphoto.com/id/1330046035/photo/headshot-portrait-of-smiling-female-doctor-in-hospital.jpg?s=612x612&w=0&k=20&c=fsNQPbmFIxoKA-PXl3G745zj7Cvr_cFIGsYknSbz_Tg=    "
    },
    {
        "id": "4",
        "name": "Dr. Michael Brown",
        "qualification": "MD",
        "speciality": "Orthopedic Surgeon",
        "address": "Hospital Address 4",
        "registrationNumber": "DOC1003",
        "mobileNumber": "+9876543213",
        "hospitalName": "Hospital 4",
        "age": 60,
        "country": "Australia",
        "description": "Dr. Michael Brown has performed over 5000 successful surgeries and is highly respected in the field of orthopedics.",
        "linkedin": "https://www.linkedin.com/in/drmichaelbrown",
        "twitter": "https://twitter.com/drmichaelbrown",
        "facebook": "https://www.facebook.com/drmichaelbrown",
        "image": "https://img.freepik.com/free-photo/young-handsome-doctor-wearing-white-medical-gown-white-medical-gloves-stethoscope-smiling-standing-white-wall_141793-30687.jpg?w=996&t=st=1719603595~exp=1719604195~hmac=bf1d7650d5629a488992d3cd91e94c3db0994a10534bb6f1a9addd05d432f070"
    }
];

const patients = [
    {
        "id": 1,
        "registrationNo": 11,
        "name": "Patient 1",
        "dateOfBirth": "1990-01-01",
        "age": 30,
        "gender": "Male",
        "mobileNumber": "+1234567890",
        "address": "Address 1",
        "height": 170,
        "heightUnit": "cm",
        "weight": 60,
        "weightUnit": "kg"
    },
    {
        "id": 2,
        "registrationNo": 12,
        "name": "Patient 2",
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
    {
        "id": 3,
        "registrationNo": 13,
        "name": "Patient 3",
        "dateOfBirth": "1990-01-01",
        "age": 32,
        "gender": "Male",
        "mobileNumber": "+1234567892",
        "address": "Address 3",
        "height": 172,
        "heightUnit": "cm",
        "weight": 62,
        "weightUnit": "kg"
    },
    {
        "id": 4,
        "registrationNo": 14,
        "name": "Patient 4",
        "dateOfBirth": "1990-01-01",
        "age": 33,
        "gender": "Female",
        "mobileNumber": "+1234567893",
        "address": "Address 4",
        "height": 173,
        "heightUnit": "cm",
        "weight": 63,
        "weightUnit": "kg"
    },
    {
        "id": 5,
        "registrationNo": 15,
        "name": "Patient 5",
        "dateOfBirth": "1990-01-01",
        "age": 34,
        "gender": "Male",
        "mobileNumber": "+1234567894",
        "address": "Address 5",
        "height": 174,
        "heightUnit": "cm",
        "weight": 64,
        "weightUnit": "kg"
    },
    {
        "id": 6,
        "registrationNo": 16,
        "name": "Patient 6",
        "dateOfBirth": "1990-01-01",
        "age": 35,
        "gender": "Female",
        "mobileNumber": "+1234567895",
        "address": "Address 6",
        "height": 175,
        "heightUnit": "cm",
        "weight": 65,
        "weightUnit": "kg"
    },
    {
        "id": 7,
        "registrationNo": 17,
        "name": "Patient 7",
        "dateOfBirth": "1990-01-01",
        "age": 36,
        "gender": "Male",
        "mobileNumber": "+1234567896",
        "address": "Address 7",
        "height": 176,
        "heightUnit": "cm",
        "weight": 66,
        "weightUnit": "kg"
    },
    {
        "id": 8,
        "registrationNo": 18,
        "name": "Patient 8",
        "dateOfBirth": "1990-01-01",
        "age": 37,
        "gender": "Female",
        "mobileNumber": "+1234567897",
        "address": "Address 8",
        "height": 177,
        "heightUnit": "cm",
        "weight": 67,
        "weightUnit": "kg"
    },
    {
        "id": 9,
        "registrationNo": 19,
        "name": "Patient 9",
        "dateOfBirth": "1990-01-01",
        "age": 38,
        "gender": "Male",
        "mobileNumber": "+1234567898",
        "address": "Address 9",
        "height": 178,
        "heightUnit": "cm",
        "weight": 68,
        "weightUnit": "kg"
    },
    {
        "id": 10,
        "registrationNo": 20,
        "name": "Patient 10",
        "dateOfBirth": "1990-01-01",
        "age": 39,
        "gender": "Female",
        "mobileNumber": "+1234567899",
        "address": "Address 10",
        "height": 179,
        "heightUnit": "cm",
        "weight": 69,
        "weightUnit": "kg"
    }
]

const prescriptions = [
    {
        "id": 1,
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
        "prescription": {
            "diagnosis": "Diagnosis for Patient 2",
            "complaints": ["complaints 1", "complaints 2"],
            "tests": ["test 1", "test 2"],
            "notes": "Notes for Patient 1",
            "medicines": [
                {
                    "name": "Paracetamol",
                    "dosage": "1-0-1",
                    "duration": "7 days"
                }
                , {
                    "name": "Amoxicillin",
                    "dosage": "1-1-1",
                    "duration": "10 days"
                },
            ]
        }
    },
    {
        "id": 1,
        "patient": {
            "id": 2,
            "registrationNo": 12,
            "name": "Patient 2",
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
            "id": 2,
            "name": "Dr. Jane Doe",
            "qualification": "MD",
            "speciality": "Neurologist",
            "address": "Hospital Address 2",
            "registrationNumber": "DOC1001",
            "mobileNumber": "+9876543211",
            "hospitalName": "Hospital 2",
            "age": 38,
            "country": "Canada",
            "description": "Dr. Jane Doe is a renowned neurologist with a passion for research and teaching.",
            "linkedin": "https://www.linkedin.com/in/drjanedoe",
            "twitter": "https://twitter.com/drjanedoe",
            "facebook": "https://www.facebook.com/drjanedoe",
            "image": "/assets/doctor.jpg"
        },
        "prescription": {
            "diagnosis": "Diagnosis for Patient 2",
            "complaints": ["complaints 1", "complaints 2"],
            "tests": ["test 1", "test 2"],
            "notes": "Notes for Patient 1",
            "medicines": [
                {
                    "name": "Paracetamol",
                    "dosage": "1-0-1",
                    "duration": "7 days"
                }
                , {
                    "name": "Amoxicillin",
                    "dosage": "1-1-1",
                    "duration": "10 days"
                },
            ]
        }
    },
]


export { doctors, patients, prescriptions };
