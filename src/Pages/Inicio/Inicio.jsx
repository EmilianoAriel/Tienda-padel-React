import { useEffect, useState } from "react";
import Filtros from "./Filter/Filter";
import PrimerBaner from "./Baner/PrimeroBaner/Primerbaner";
import axios from "axios";
import "./Inicio.css";
import MainComponents from "./Main/MainComponents";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
const URL = import.meta.env.VITE_SERVER_URL;
const URL2 = import.meta.env.VITE_LOCAL_SERVER;

export default function Inicio() {
  const { token, logout } = useUser();
  const { setFilters, filters } = useOrder();
  const [cards, setCard] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function cardCreator() {
      try {
        const prod = await axios.get(`${URL}/products`);

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
    cardCreator();
  }, []);

  const promoCards = cards.filter((card) => card.promo.trim() !== "");

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
