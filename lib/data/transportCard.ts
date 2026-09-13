export const HOTEL_ADDRESS = "Hotel Lisbon 5, Rua da Palma 284, Lisboa, Portugal";
export const AIRPORT_METRO_ADDRESS = "Estação de Metro Aeroporto, Lisboa, Portugal";

export const fareInfo = {
  cardName: "Navegante Ocasional",
  cardPrice: 0.5,
  ticket24hName: "24h Carris/Metro",
  ticket24hPrice: 7.25,
  singleTicketPrice: 1.9,
  zappingPricePerTrip: 1.72,
  contactlessPricePerTrip: 1.92,
  effectiveSince: "01/01/2026",
  metroHours: "06:30 – 01:00",
  checkedOn: "13/09/2026",
};

export const sources = [
  {
    label: "Metropolitano de Lisboa — Cartão Navegante Ocasional",
    url: "https://www.metrolisboa.pt/comprar/cartao-navegante-ocasional/",
  },
  {
    label: "Metropolitano de Lisboa — Novas Tarifas 2026",
    url: "https://www.metrolisboa.pt/2025/12/19/novas-tarifas-2026/",
  },
  {
    label: "Carris — Novo Tarifário 2026",
    url: "https://www.carris.pt/descubra/novo-tarifario-2026/",
  },
];

export interface SalePoint {
  id: string;
  rank: 1 | 2 | 3 | null;
  name: string;
  address: string;
  mapsQuery: string;
  line: string;
  hours: string;
  walkMin: number | null;
  walkKm: number | null;
  note?: string;
}

export const salePoints: SalePoint[] = [
  {
    id: "martim-moniz",
    rank: 1,
    name: "Estación de Metro Martim Moniz",
    address: "Praça Martim Moniz, Lisboa",
    mapsQuery: "Estação de Metro Martim Moniz, Lisboa, Portugal",
    line: "🟢 Línea Verde",
    hours: "06:30 – 01:00",
    walkMin: 3,
    walkKm: 0.2,
    note: "La más cercana al hotel — bajando por Rua da Palma",
  },
  {
    id: "intendente",
    rank: 2,
    name: "Estación de Metro Intendente",
    address: "Largo do Intendente, Lisboa",
    mapsQuery: "Estação de Metro Intendente, Lisboa, Portugal",
    line: "🟢 Línea Verde",
    hours: "06:30 – 01:00",
    walkMin: 8,
    walkKm: 0.6,
  },
  {
    id: "rossio",
    rank: 3,
    name: "Estación de Metro Rossio",
    address: "Praça Dom Pedro IV, Lisboa",
    mapsQuery: "Estação de Metro Rossio, Lisboa, Portugal",
    line: "🟢 Línea Verde",
    hours: "06:30 – 01:00",
    walkMin: 11,
    walkKm: 0.9,
  },
  {
    id: "restauradores",
    rank: null,
    name: "Estación de Metro Restauradores",
    address: "Praça dos Restauradores, Lisboa",
    mapsQuery: "Estação de Metro Restauradores, Lisboa, Portugal",
    line: "🔵 Línea Azul",
    hours: "06:30 – 01:00",
    walkMin: 12,
    walkKm: 0.9,
  },
  {
    id: "aeroporto",
    rank: null,
    name: "Estación de Metro Aeroporto",
    address: "Aeroporto Humberto Delgado, Lisboa",
    mapsQuery: "Estação de Metro Aeroporto, Lisboa, Portugal",
    line: "🔴 Línea Roja",
    hours: "06:30 – 01:00",
    walkMin: null,
    walkKm: null,
    note: "Justo en la llegada de vuelos — ideal si compráis nada más aterrizar",
  },
];

export const includedTransports = [
  { emoji: "🚇", name: "Metro de Lisboa", included: true },
  { emoji: "🚌", name: "Autobús Carris", included: true },
  { emoji: "🚋", name: "Tranvía Carris (incluido el 28 y el 15E)", included: true },
  { emoji: "⛰️", name: "Funiculares Glória, Bica y Lavra", included: true },
  { emoji: "🗼", name: "Elevador de Santa Justa", included: true },
  { emoji: "🚆", name: "Trenes CP (Sintra, Cascais...)", included: false },
  { emoji: "⛴️", name: "Ferry Transtejo/Soflusa (a Cacilhas, Cristo Rei)", included: false },
];
