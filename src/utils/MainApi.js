import {BASE_URL} from "./constants";

const checkResponse = async (res) => {
  if (res.ok) {
    return await res.json()
  } else {
    throw new Error(`Error: ${res.status}`)
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`)

    return await checkResponse(response)

  } catch (err) {
    console.error(err)
  }
}

// Update current user:
export const updateCurrentUser = async (name, email) => {
  if (!name || !email) return;

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({name, email}),
    })

    return await checkResponse(response)
  } catch (error) {
    console.error('Update User Error', error)
    throw error
  }
}
