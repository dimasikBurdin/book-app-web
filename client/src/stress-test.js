const registerAndLogin = async ({ email, password, name }) => {
    const resRegister = await (await fetch('http://localhost:3004/api/user', {
        method: 'POST',
        body: JSON.stringify({
            email,
            name,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    })).json();


    const userId = resRegister.userId

    const login = await (await fetch('http://localhost:3004/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    })).json()

    const access_token = login.access_token;

    const arr = new Array(900); // т к ответ 0.003s, это примерно 300rps


    for (let [index] of arr.entries()) {
        console.time(index)

        await fetch('http://localhost:3004/api/all-books/best-books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application / json',
                Authorization: `Bearer ${access_token}`
            }
        })

        console.timeEnd(index)
    }

}

registerAndLogin({ email: 'a', password: '111' })
// registerAndLogin({ email: 'b@mail.ru', password: '222', name: 'b' })

// {
//     "name": "asdaa",
//     "email": "sd@asd.ru",
//     "password": "123",
//     "userId": 1
// }

// {
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkQGFzZC5ydSIsInN1YiI6MSwiaWF0IjoxNzAwMTU3MjA0fQ.vYWWnvo_LIYMX_bYJKrsUuPseDysBNEZ_C3TMRMoMM4",
//     "userId": 1
// }