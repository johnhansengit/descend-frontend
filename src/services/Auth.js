import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    console.log("SignInUser error: "+error)
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    console.log("RegisterUser error: "+error)
    throw error
  }
}

export const CheckUserName = async (userName) => {
  try {
    const res = await Client.post('/auth/checkUserName', { userName })
    return res.data.exists
  } catch (error) {
    console.log("CheckUserName error: "+error)
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    console.log("CheckSession error: "+error)
    throw error
  }
}