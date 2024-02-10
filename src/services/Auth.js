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

export const ChangeUserName = async (data) => {
  try {
    const res = await Client.post('/auth/changeUserName', data)
    return res.data
  } catch (error) {
    console.log("ChangeUserName error: "+error)
    throw error
  }
}

export const ChangeEmail = async (data) => {
  try {
    const res = await Client.post('/auth/changeEmail', data)
    return res.data
  } catch (error) {
    console.log("ChangeEmail error: "+error)
    throw error
  }
}

export const ChangePassword = async (data) => {
  try {
    const res = await Client.post('/auth/changePassword', data)
    return res.data
  } catch (error) {
    console.log("ChangePassword error: "+error)
    throw error
  }
}