import axios from "axios";

const uri = process.env.ULCA_API_URI ?? null;
const userId = process.env.ULCA_USER_ID ?? null;
const ulcaApiKey = process.env.ULCA_API_KEY ?? null;
const AuthorizationToken = process.env.ULCA_AUTH_TOKEN ?? null;
const serviceId= process.env.ULCA_SERVICE_ID ?? null;

export default async (sourcetext, from, to) => {
    const payload = {
        "pipelineTasks": [
            {
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": from,
                        "targetLanguage": to
                    },
                    "serviceId": serviceId
                }
            }
        ],
        "inputData": {
            "input": [
                {
                    "source": sourcetext
                }
            ]
        }
    }
    return axios.post(uri,
        payload, {
        headers: {
            Authorization: AuthorizationToken,
            'Content-Type': 'application/json',
            'ulcaApiKey': ulcaApiKey,
            'userId': userId
        }
    }).then((res) => {
        console.log(res.data.pipelineResponse[0].output[0].target)
        return res.data.pipelineResponse[0].output[0].target;
    })
}