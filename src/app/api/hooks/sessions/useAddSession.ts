import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Inputs } from "@/types/optionsAndTypes";
import { getAllSessionsQueryKey } from "./useGetAllSessions";

const addSession= async (data: Inputs) => {
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const useAddSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Inputs) => addSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getAllSessionsQueryKey() });
    },
  });
};
