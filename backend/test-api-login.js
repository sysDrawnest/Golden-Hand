const axios = require('axios')

async function testLogin() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@goldenhands.com',
            password: 'Admin@1234'
        })
        console.log('✅ Login success!')
        console.log('User:', res.data.user)
        console.log('Token length:', res.data.token.length)
    } catch (err) {
        console.error('❌ Login failed!')
        console.error('Status:', err.response?.status)
        console.error('Message:', err.response?.data?.message)
    }
}
testLogin()
