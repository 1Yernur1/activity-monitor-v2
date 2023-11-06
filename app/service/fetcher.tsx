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
    method: "GET",
    mode: "no-cors",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJjdXN0b21fY2xhaW1zIjpbIlBST0pFQ1RfTUFOQUdFUiJdLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWN0aXZpdHltb25pdG9yaW5nLTE5MjVjIiwiYXVkIjoiYWN0aXZpdHltb25pdG9yaW5nLTE5MjVjIiwiYXV0aF90aW1lIjoxNjk5MDExMzkwLCJ1c2VyX2lkIjoiQVIzeWc3Z1lUTVRUbThWQkxYSVdyU2duc3NjMiIsInN1YiI6IkFSM3lnN2dZVE1UVG04VkJMWElXclNnbnNzYzIiLCJpYXQiOjE2OTkwMTEzOTAsImV4cCI6MTY5OTAxNDk5MCwiZW1haWwiOiJhbWFuZ2VsZHltYWtzYXQ3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbWFuZ2VsZHltYWtzYXQ3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.mDxTAdYLf6IAqe6BOwidMlDDvBqOtGwFhmNit2EY7HCvdKkJRJkVLoQbzJdCTRsmKoh1HJqdI1E8y1o6rqAE7mibTf5Ny3bj3Yy-CKGQbMG3yRPB_DlfLaI8A1BpcUtrLVPeyGxRYNGLjBB5JmPjyNuUxu8epCKpG-4dcvVhTtUTdrdJQzC2SJCzymNHtHnS1G5wmVA_b99GUlJ76oe3P2WGjIG3pTbPjrOYvkI71aP9NHhPNgwXzW8kx0ZGAggH1Lr-Jkpwnkjtfv1Qenl5CTsRZTKQAqD3qCMuiT0Dj2eWxmDwzPv32yGtEJkhTU-aqhcIN_EoTAg-wqcatiHY-A"
    },
  });
};
