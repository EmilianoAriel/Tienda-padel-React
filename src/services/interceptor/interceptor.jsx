import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_SERVER,
});

const useApi = () => {
  const { token, logout } = useUser();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    });

    const responsetInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error);
        if (error.response.status === 401) {
          Swal.fire({
            title: "Error",
            text: "Sesion vencida o invalida",
            icon: "error",
            timer: 1500,
          }).then(() => {
            logout();
          });
        }
        if (error.response.status === 409) {
          Swal.fire({
            title: "Error!",
            text: "El email ya está registrado. Por favor, usa otro.",
            icon: "error",
            showConfirmButton: true,
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responsetInterceptor);
    };
  }, [token]);

  return api;
};

export default useApi;
