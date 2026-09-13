import type { PackingItem } from "../types";

// The original list read as one person's checklist (vestido, maquillaje…),
// so it starts as Gisela's maleta. Denis starts empty — add his own items
// from the Maleta screen.
export const packingList: PackingItem[] = [
  { id: "ventilador", name: "Ventilador de mano", owner: "gisela" },
  { id: "gafas-sol", name: "Gafas de sol", owner: "gisela" },
  { id: "sudadera", name: "Sudadera", owner: "gisela" },
  { id: "bambas", name: "Bambas cómodas", owner: "gisela" },
  { id: "outfit-ida", name: "Outfit para ir", owner: "gisela" },
  { id: "outfit-tarde", name: "Outfit de tarde", owner: "gisela" },
  { id: "outfit-noche", name: "Outfit de noche", owner: "gisela" },
  { id: "outfit-manana", name: "Outfit día siguiente / mañana", owner: "gisela" },
  { id: "outfit-vuelta", name: "Outfit para volver", owner: "gisela" },
  { id: "gorra", name: "Gorra", owner: "gisela" },
  { id: "bolso", name: "Bolso", owner: "gisela" },
  { id: "zapatos-vestir", name: "Zapatos de vestir cómodos", owner: "gisela" },
  { id: "chanclas", name: "Chanclas", owner: "gisela" },
  { id: "neceser", name: "Neceser", owner: "gisela" },
  { id: "plancha", name: "Plancha", owner: "gisela" },
  { id: "maquillaje", name: "Maquillaje", owner: "gisela" },
  { id: "vestido-amarillo", name: "Vestido amarillo", owner: "gisela" },
  { id: "bateria-portatil", name: "Batería portátil", owner: "gisela" },
  { id: "tiritas", name: "Tiritas", owner: "gisela" },
];
