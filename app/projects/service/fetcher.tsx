const url = "https://activity-monitoring-m950.onrender.com";

export const getAllProjects = async () => {
  return fetch(`${url}/projects`, {
    headers: {
      Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("idToken"): ""}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) return response.json();
    // throw new Error();
  });
};

export const getAllManagers = async () => {
  return fetch(`${url}/users/projectManagers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) return response.json();
    throw new Error();
  });
};

export const getAllFreeChiefEditors = async () => {
  return fetch(`${url}/users/chiefEditors/free`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) return response.json();
    throw new Error();
  });
};

export const createProject = async (data: any) => {
  return fetch(`${url}/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 201) {
      throw new Error();
    }
  });
};

export const getProjectById = (id: string) => {
  return fetch(`${url}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) return response.json();
    throw new Error();
  });
};
