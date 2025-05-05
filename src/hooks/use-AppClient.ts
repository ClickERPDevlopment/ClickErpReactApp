export default function useAppClient() {
  const currentClient = import.meta.env.VITE_APP_CLIENT_NAME;

  const NUR = "NUR";
  const ICCL = "ICCL";
  const VERSATILE = "VERSATILE";
  const AG = "AG";
  const EURO = "EURO";
  const PRESENTATION = "PRESENTATION";
  const FAME = "FAME";

  return { currentClient, NUR, ICCL, VERSATILE, AG, EURO, FAME, PRESENTATION };
}
