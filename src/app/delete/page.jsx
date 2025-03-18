"use client";

import axios from "axios";
import React from "react";

export default function displayUserInfo(userinfo) {
  const userId = 123;

  const userData = {
    name: "John Doe", // User's name

    email: "john@example.com", // User's email

    // Add more fields as necessary
  }; // Users info typed in the inputs

  // Function to send the user data to the server using Axios

  function submitUserInfo() {
    axios
      .post("https://api.example.com/users", userData) // first is the api to be targeted, second is the info to be sent

      .then((response) => {
        // Assuming the response is the data confirming the user has been created or updated

        console.log("User data successfully submitted:", response.data);
      })

      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
      });
  }
  return <div>{userinfo.name}</div>;
}
