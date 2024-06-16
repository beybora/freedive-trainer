import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getDivesQueryKey } from "@/app/api/hooks/useDives";
import { Inputs } from "@/constants/optionsAndTypes";

const addDive = async (data: Inputs) => {
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const useAddDive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Inputs) => addDive(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDivesQueryKey() });
    },
  });
};
