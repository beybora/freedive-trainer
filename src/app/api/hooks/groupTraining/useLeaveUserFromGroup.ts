import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllGroupTrainingQueryKey } from "./useGetAllGroupTraining";

const leaveUserFromGroup = async (groupId: string) => {
  const response = await fetch(`/api/group-training/${groupId}`, {
    method: "DELETE",
  });
  return response.json();
};

// single data object or alternatively spread the data object  mutationFn: (...data),
// because the second argument in MutationFn is reserved for the context object
export const useLeaveUserFromGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: string) => leaveUserFromGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAllGroupTrainingQueryKey(),
      });
    },
  });
};
