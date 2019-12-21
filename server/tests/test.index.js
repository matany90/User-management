const test = require('ava');
const axios = require('axios');
const _ = require('lodash');

const TEST_PORT = 5000;
const TEST_URL = `http://localhost:${TEST_PORT}`
let TEST_USER = { name: 'matan', email: 'matany90@gmail.com', phone: '0522542570' }; //Will hold 'User ID' after testing 'added user', will be used for testing 'update user' and 'delete user'

test.serial('fetch users endpoint', async t => {
    const { data } = await axios.get(`${TEST_URL}/api/users`);
    t.is(typeof data.users, typeof []);
});

test.serial('add user endpoint', async t => {
    const { data } = await axios.post(`${TEST_URL}/api/users/addUser`, { user: TEST_USER });
    TEST_USER = {...TEST_USER, id: data.user.id };
	t.true(TEST_USER.name === data.user.name && TEST_USER.email === data.user.email && TEST_USER.phone === data.user.phone)
});

test.serial('update user endpoint', async t => { 
    const { data } = await axios.post(`${TEST_URL}/api/users/updateUser`, { user: TEST_USER });
	t.true(TEST_USER.id === data.user.id)
});

test.serial('delete user endpoint', async t => { 
    const { data } = await axios.post(`${TEST_URL}/api/users/deleteUser`, { user: TEST_USER });
	t.true(TEST_USER.id === data.user.id)
});

