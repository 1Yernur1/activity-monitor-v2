export const getAllActivitiesFromServer = async (token: string) => {
  const url = "https://activity-monitoring-m950.onrender.com";
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