import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllGroupTrainingQueryKey } from "./useGetAllGroupTraining";

const addUserToGroup = async (groupId: string) => {
    const response = await fetch(`api/group-training/${groupId}`, {
    method: "PUT",
  });
  return response.json();
};

export const useAddUserToGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: string) => addUserToGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAllGroupTrainingQueryKey(),
      });
    },
  });
};
