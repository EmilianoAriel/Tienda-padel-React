import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../services/interceptor/interceptor";
import { json } from "react-router-dom";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider({ children }) {
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [popUp, setPopUp] = useState([]);
  const [popVisible, setPopVisible] = useState(false);
  const [cantidadPop, setCantidadPop] = useState(1);
  const [filters, setFilters] = useState([]);
  const api = useApi();
  useEffect(() => {
    incCount();
    calcularTotal();
    console.log(order);
  }, [order]);

  function addProduct(product, cantidad) {
    const prodExist = order.find((prod) => prod._id === product._id);

    if (cantidad) {
      if (prodExist) {
        prodExist.quantity += cantidad;
        setOrder([...order]);
      } else {
        product.quantity = cantidad;
        setOrder([...order, product]);
      }
      setCantidadPop(cantidad);
    } else {
      if (prodExist) {
        prodExist.quantity++;
        setOrder([...order]);
      } else {
        product.quantity = 1;
        setOrder([...order, product]);

        console.log(order);
      }
      setCantidadPop(1);
    }

    setPopUp(product);
    setPopVisible(true);

    setTimeout(() => {
      setPopVisible(false);
    }, 2000);

    console.log(cantidad);
  }

  function incCount() {
    let cantidadItems = 0;
    for (let item of order) {
      cantidadItems += item.quantity;
    }

    setCount(cantidadItems);
  }

  function calcularTotal() {
    let total = 0;

    order.forEach((item) => {
      if (item.promo) {
        total += item.promo * item.quantity;
      } else {
        total += item.price * item.quantity;
      }

      setTotal(total);
    });
  }

  function removeProduct(id) {
    const indice = order.findIndex((prod) => prod._id === id);

    const orderFiltered = order.filter((prod) => prod._id !== id);
    setOrder(orderFiltered);
  }

  function delateProduct(id) {
    if (id.quantity > 1) {
      id.quantity--;
      setOrder([...order]);
    }
  }

  function sumProduct(id) {
    id.quantity++;
    setOrder([...order]);
  }

  async function finishOrder() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const orderProducts = {
        products: order.map((item) => ({
          name: item.name,
          price: item.promo || item.price,
          description: item.description,
          quantity: item.quantity,
        })),
      };

      const orderData = {
        user: user._id,
        orders: [orderProducts],
      };

      const response = await api.post("/orders", orderData);

      if (response.data.initPoint) {
        window.location.href = response.data.initPoint;
      } else {
        console.log("No se encontró el initPoint");
      }

      console.log("Orden enviada:", response.data);
    } catch (error) {
      console.log("A ocurrido un error en el front:", error);
    }
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        addProduct,
        toggleModal,
        setToggleModal,
        count,
        total,
        delateProduct,
        removeProduct,
        sumProduct,
        count,
        setCount,
        popUp,
        cantidadPop,
        setCantidadPop,
        popVisible,
        filters,
        setFilters,
        finishOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
