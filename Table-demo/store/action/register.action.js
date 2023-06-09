import { axiosInstance } from "app/services/axios/axiosConfig";

import _ from "@lodash";

export const ADD_USER = "ADD_USER";

export const DELETE_USER = "DELETE_USER";

export const GET_USER = "GET_USER";

export const UPDATE_USER = "UPDATE_USER";

export const addUser = (user) => {
  const { firstname, lastname, email, phone, profile, age } = user;

  return async (dispatch) => {
    console.log("firstname: ", user);
    if (!profile) {
      window.alert("Please Fill User Profile");
    } else if (!firstname) {
      window.alert("Please Fill User First Name ");
    } else if (firstname.length < 3) {
      window.alert("Please Fill User  First Name More then 3 characters");
    } else if (!lastname) {
      window.alert("Please Fill User Last Name ");
    } else if (lastname.length < 3) {
      window.alert("Please Fill User Last Name More  then 3 characters");
    } else if (!email) {
      window.alert("Please Fill  User Email ");
    } else if (!phone) {
      window.alert("Please Fill User Phone Number");
    } else if (phone.length !== 10) {
      window.alert("Phone Number is not valid");
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      window.alert("Please Fill User Email  Properly");
    } else if (!age) window.alert("Please fill Enter user age");
    else if (isNaN(Number(age))) window.alert("Enter Numeric age data ..");

    try {
      const response = await axiosInstance({
        method: "post",
        url: "http://localhost:5000/",
        data: { firstname, lastname, email, phone, profile, age },
      });
      if (response.data) {
        window.alert("Registration succesfully");

        dispatch({ type: ADD_USER, payload: response.data });
      }
      return response.data;
    } catch (error) {
      console.log({ "Error meassge ": error });
    }
  };
};
export const getdata = (page, limit) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `http://localhost:5000/getdata?limit=${limit}&page=${page}`,
      });
      if (response.data) {
        dispatch({ type: GET_USER, payload: response.data });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance({
        method: "delete",
        url: "http://localhost:5000/delete",
        data: { _id },
      });
      if (response.data) {
        window.alert("User deleted successfully");
        dispatch({ type: DELETE_USER, payload: response.data });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (obj) => {
  const { firstname, lastname, email, phone, age, profile } = obj;
  console.log("upatet", obj);
  return async (dispatch) => {
    if (!firstname) {
      window.alert("Please Fill User First Name ");
    } else if (firstname.length < 3) {
      window.alert("Please Fill User  First Name More then 3 characters");
    } else if (!lastname) {
      window.alert("Please Fill User Last Name ");
    } else if (lastname.length < 3) {
      window.alert("Please Fill User Last Name More  then 3 characters");
    } else if (!email) {
      window.alert("Please Fill  User Email ");
    } else if (!phone) {
      window.alert("Please Fill User Phone Number");
    } else if (phone.length !== 10) {
      window.alert("Phone Number is not valid");
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      window.alert("Please Fill User Email  Properly");
    } else if (!age || age.length >= 3)
      window.alert("Please fill Enter user age properly");
    else if (isNaN(Number(age))) window.alert("Enter Numeric age data ..");
    try {
      const response = await axiosInstance({
        method: "PATCH",
        url: "http://localhost:5000/update",
        data: obj,
      });
      if (response.data) {
        window.alert("Form updated succesfully");
        dispatch({ type: UPDATE_USER, payload: response.data });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};
