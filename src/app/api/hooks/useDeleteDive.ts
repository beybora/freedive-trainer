import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getDivesQueryKey } from "@/app/api/hooks/useDives";

/**
 * deleteDive
 *  @description  Deletes a dive from the API
 * @returns  {Promise<any>}
 */
export const deleteDive = async (id: string) => {
  console.log()
  const response = await fetch(`/api/session/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

/**
 * useDeleteDive hook
 *  @description  Deletes a dive from the API
 * @returns  {ReturnType<typeof useMutation>}
 */
export const useDeleteDive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDivesQueryKey() });
    },
  });
};
