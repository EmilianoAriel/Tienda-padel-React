import { useEffect, useState } from "react";
import Filtros from "./Filter/Filter";
import PrimerBaner from "./Baner/PrimeroBaner/Primerbaner";
import axios from "axios";
import "./Inicio.css";
import MainComponents from "./Main/MainComponents";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/interceptor/interceptor";
const URL = import.meta.env.VITE_SERVER_URL;

export default function Inicio() {
  const { token, logout } = useUser();
  const { setFilters, filters } = useOrder();
  const [cards, setCard] = useState([]);
  const [sections, setSections] = useState([]);
  const [prom, setProm] = useState([]);
  const api = useApi();

  async function cardCreator() {
    try {
      const prod = await api.get(`/products`);

      setCard(prod.data);

      const uniqueSections = [
        ...new Set(prod.data.map((item) => item.section)),
      ];
      setSections(uniqueSections);
      setFilters(uniqueSections);
    } catch (error) {
      if (error.response.status === 401) {
        alert("Usuario no autorizado");
        logout();
      }
      console.error("Error al obtener los productos:", error);
    }
  }

  useEffect(() => {
    cardCreator();
  }, []);

  const promoCards = cards.filter((card) => card.promo);

  console.log(promoCards);
  function Filtrar(id) {
    console.log(id);
  }

  return (
    <>
      <PrimerBaner />

      <Filtros filtrar={Filtrar} />

      <MainComponents key="promo" title="Promo" cards={promoCards} />

      {sections.map((section) => (
        <MainComponents key={section} title={section} cards={cards} />
      ))}
    </>
  );
}
