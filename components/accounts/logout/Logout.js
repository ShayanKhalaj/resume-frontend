import React from "react";
import * as AxiosRepository from "../../../repositories/axios/AxiosRepository";
import { removeToken } from "../../../redux/features/accounts/users/UserSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "./Logout.module.css";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    AxiosRepository.GET("account/logout")
      .then((response) => {
        dispatch(removeToken());
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutHandler = () => {
    logout();
  };

  return (
    <button
      type="button"
      onClick={logoutHandler}
      className={`btn btn-danger ${styles.logoutButton}`}
    >
    خروج 
    </button>
  );
};

export default Logout;
