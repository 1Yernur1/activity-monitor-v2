export const getAllActivitiesFromServer = async (token: string) => {
  const url = "http://localhost:8080";
  return await fetch(`${url}/activities`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      return response.json().then((errorData) => {
        throw new Error(errorData);
      });
    }
    return response.json();
  });
};