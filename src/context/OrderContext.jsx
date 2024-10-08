import { createContext, useContext, useEffect, useState } from "react";

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
  useEffect(() => {
    incCount();
    calcularTotal();
  }, [order]);

  function addProduct(product, cantidad) {
    const prodExist = order.find(prod => prod.id === product.id);

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

    order.forEach(item => {
      if (item.promo) {
        total += item.promo * item.quantity;
      } else {
        total += item.price * item.quantity;
      }

      setTotal(total);
    });
  }

  function removeProduct(id) {
    const indice = order.findIndex(prod => prod.id === id);

    const orderFiltered = order.filter(prod => prod.id !== id);
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
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
