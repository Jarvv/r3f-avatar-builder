import { useEffect } from "react";
import { useConfiguratorStore } from "../stores/configuratorStore";

export const useCategories = () => {
  const { fetchCategories } = useConfiguratorStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
};
