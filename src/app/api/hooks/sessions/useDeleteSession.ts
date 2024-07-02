import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getAllSessionsQueryKey } from "./useGetAllSessions";


const deleteSession = async (id: string) => {
  console.log();
  const response = await fetch(`/api/session/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getAllSessionsQueryKey() });
    },
  });
};
