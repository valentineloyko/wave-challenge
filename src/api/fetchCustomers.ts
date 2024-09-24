import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../store/appStore";
import { Customer } from "../types/customer";
import { useEffect } from "react";

const fetchCustomersFromAPI = async (): Promise<Customer[]> => {
  const response = await fetch(
    "https://waveaccounting.github.io/se-challenge-fe-customers/settings.json"
  );
  if (!response.ok) throw new Error("Failed to fetch customers");

  const data = await response.json();
  return data.customers;
};

export const useFetchCustomers = () => {
  const setCustomers = useAppStore((state) => state.setCustomers);

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomersFromAPI,
  });

  useEffect(() => {
    if (query.status === "success" && query.data) {
      setCustomers(query.data);
    }
  }, [query.status, query.data, setCustomers]);

  return query;
};
