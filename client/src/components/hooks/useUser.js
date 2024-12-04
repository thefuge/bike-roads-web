import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "../../api/axiosInstance";

export default function useUser() {
  const [user, setUser] = useState({ status: "fetching", data: null });

  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: "logged", data: data.user });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []); // отслеживает изменения каких-либо данных на странице (отрисовывает без перезагрузки)

  const logoutHandler = () => {
    axiosInstance
      .get("/account/logout")
      .then(() => setUser({ status: "guest", data: null }));
    setAccessToken("");
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    if (!formData.name || !formData.email || !formData.password) {
      return alert("Заполните все поля!");
    }
    axiosInstance
      .post("/account/register", formData)
      .then(({ data }) => {
        setUser({ status: "logged", data: data.user });
        setAccessToken(data.accessToken);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert("Отсутствуют обязательные поля!");
    }
    axiosInstance
      .post("/account/login", formData)
      .then(({ data }) => {
        setUser({ status: "logged", data: data.user });
        setAccessToken(data.accessToken);
      })
      .catch((error) => {
        alert("Неправильный адрес электронной почты или пароль");
        console.log(error);
      });
  };

  return {
    user,
    signInHandler,
    signUpHandler,
    logoutHandler,
  };
}
