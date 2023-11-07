import { auth } from "@/config/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const singInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const url = "https://identitytoolkit.googleapis.com/v1";
  const key = auth.config.apiKey;
  const body = {
    email,
    password,
    returnSecureToken: true,
  };
  return await fetch(`${url}/accounts:signInWithPassword?key=${key}`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.status === 400) {
      return response.json().then((errorData) => {
        throw new Error(errorData);
      });
    }
    return response.json();
  });
};

export const getAllActivities = async (token: string) => {
  const url = "http://localhost:8080";
  return await fetch(`${url}/projects`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status >= 400) {
      return response.json().then((errorData) => {
        throw new Error(errorData);
      });
    }
    return response.json();
  });
};
