import http from 'k6/http';
import {check} from "k6";

const URL = 'http://localhost:8080/';
const payload = { username: 'John', password: 'Doe' };

export let options = {
    vus: 100,
    stages: [
        { duration: '10s', target: 20 }, // Ramp-up to 20 VUs over 10 seconds
        { duration: '10s', target: 50 }, // Ramp-up to 50 VUs over the next 30 seconds
        { duration: '20s', target: 100 }, // Ramp-up to 100 VUs over the next 20 seconds
        { duration: '10s', target: 100 }, // Stay at 100 VUs for 10 seconds
        { duration: '10s', target: 0 }, // Ramp-down to 0 VUs over the last 10 seconds
    ],
};

export default function () {
    const headers = { 'Content-Type': 'application/json' }
    const response = http.post(URL, JSON.stringify(payload), { headers });
    check(response, {
        'status is 200': (r) => r.status === 200,
        'response is correct': (r) => r.body === JSON.stringify(payload),
    });
}
