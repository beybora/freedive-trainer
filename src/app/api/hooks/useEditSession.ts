import { Inputs } from "@/constants/optionsAndTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDivesQueryKey } from "./useDives";

const editSession = async (id: string, requestBody: Inputs) => {
  const response = await fetch(`/api/session/${id}`, {
    method: "PUT",
    body: JSON.stringify(requestBody),
  });
  return response.json();
};

export const useEditSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, requestBody }: { id: string; requestBody: Inputs }) =>
      editSession(id, requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDivesQueryKey() });
    },
  });
};
