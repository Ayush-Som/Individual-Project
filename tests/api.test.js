// api.test.js
const axios = require('axios');

describe('API Tests', () => {
  test('GET /light_devices returns status 200', async () => {
    const response = await axios.get('http://localhost:5000/api/light_devices');
    expect(response.status).toBe(200);
  });

  test('POST /light_devices creates a new user', async () => {
    const newUser = { user: 'light3', status: 'off', colorpicker: '#000', type: 'light' };
    const response = await axios.post('http://localhost:5000/api/light_devices', newUser);
    expect(response.status).toBe(200);
  });

  test('PUT /light_devices update a user', async () => {
    const newUser = { user: 'light3', status: 'on', colorpicker: '#fff', type: 'light' };
    const response = await axios.put('http://localhost:5000/api/light_devices', newUser);
    expect(response.status).toBe(200);
  });

  test('DELETE /light_devices deletes a user', async () => {
    const userToDelete = { user: 'light3', type: 'light' }; // Provide the necessary identification data
    const response = await axios.delete('http://localhost:5000/api/light_devices', { data: userToDelete });
    expect(response.status).toBe(200);
  });

  ///////////////////////////////////////=========== AC =========///////////////////////////////////
  test('GET /air_conditioning_devices returns status 200', async () => {
    const response = await axios.get('http://localhost:5000/api/air_conditioning_devices');
    expect(response.status).toBe(200);
  });

  test('POST /air_conditioning_devices creates a new user', async () => {
    const newUser = { user: 'AC2', status: 'off', temperature: '22', type: 'ac' };
    const response = await axios.post('http://localhost:5000/api/air_conditioning_devices', newUser);
    expect(response.status).toBe(200);
  });

  test('PUT /air_conditioning_devices update a user', async () => {
    const newUser = { user: 'AC2', status: 'on', temperature: '17', type: 'ac' };
    const response = await axios.put('http://localhost:5000/api/air_conditioning_devices', newUser);
    expect(response.status).toBe(200);
  });

  test('DELETE /air_conditioning_devices deletes a user', async () => {
    const userToDelete = { user: 'AC2', type: 'ac' };
    const response = await axios.delete('http://localhost:5000/api/air_conditioning_devices', { data: userToDelete });
    expect(response.status).toBe(200);
  });

  test('GET /security_devices returns status 200', async () => {
    const response = await axios.get('http://localhost:5000/api/security_devices');
    expect(response.status).toBe(200);
  });

  test('POST /security_devices creates a new user', async () => {
    const newUser = { user: 'Backdoor', status: 'off', type: 'security' };
    const response = await axios.post('http://localhost:5000/api/security_devices', newUser);
    expect(response.status).toBe(200);
  });

  test('PUT /security_devices update a user', async () => {
    const newUser = { user: 'Backdoor', status: 'on', type: 'security' };
    const response = await axios.put('http://localhost:5000/api/security_devices', newUser);
    expect(response.status).toBe(200);
  });

  test('DELETE /security_devices deletes a user', async () => {
    const userToDelete = { user: 'Backdoor', type: 'security' };
    const response = await axios.delete('http://localhost:5000/api/security_devices', { data: userToDelete });
    expect(response.status).toBe(200);
  });
});
