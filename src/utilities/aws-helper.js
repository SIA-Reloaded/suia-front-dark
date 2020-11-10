export const getUserData = async (username) => {
  const response = await fetch(`https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/system/getUserData/${username}`)
  
  const userData = await response.json()
  console.log(userData)
  return userData;
}