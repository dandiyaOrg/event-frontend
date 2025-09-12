const API_URL = "http://localhost:5000/users";

export async function registerUser(userData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
}

export async function loginUser(email, password) {
  // const res = await fetch(`${API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  // const users = await res.json();
  // return users.length > 0 ? users[0] : null;

  const users = {
      "id": "d58e",
      "firstName": "Kunal",
      "lastName": "Jangid",
      "email": "ctae0179@gmail.com",
      "password": "Kunal@123"
    }

    return users;
}
