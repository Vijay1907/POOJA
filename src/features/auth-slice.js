import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const storedUser = localStorage.getItem("user");
let initialState = {
  isAuthenticated: false,
  user: null,
};

if (storedUser) {
  try {
    const decryptedUser = CryptoJS.AES.decrypt(
      storedUser,
      "your-encryption-key"
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedUser) {
      initialState = {
        isAuthenticated: true,
        user: JSON.parse(decryptedUser),
      };
    }
  } catch (error) {
    console.error("Error decrypting user:", error);
    localStorage.removeItem("user");
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      console.log("----action",action.payload)
      // state.user = action.payload?.admin;
      state.user = action.payload?.user;
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(state.user),
        "your-encryption-key"
      ).toString();
      localStorage.setItem("user", encryptedUser);
      localStorage.setItem("isAuthenticated", true);
    },
    changeUserData: (state, action) => {
      state.isAuthenticated = true;
      console.log("----action",action.payload)
      // state.user = action.payload?.admin;
      state.user = action.payload?.user;
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(state.user),
        "your-encryption-key"
      ).toString();
      localStorage.setItem("user", encryptedUser);
      localStorage.setItem("isAuthenticated", true);
    },
    logout: (state, action) => {
      console.log("logout");
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { login, logout,changeUserData } = authSlice.actions;
export default authSlice.reducer;