import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getDivesQueryKey } from "@/app/api/hooks/useDives";

export const deleteDive = async (id: string) => {
  console.log()
  const response = await fetch(`/api/session/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const useDeleteDive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDivesQueryKey() });
    },
  });
};
