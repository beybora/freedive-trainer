import { GroupTraining } from "@/constants/optionsAndTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllGroupTrainingQueryKey } from "./useGetAllGroupTraining";

const addGroupTraining = async (data: GroupTraining) => {
  const response = await fetch("/api/group-training", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const useAddGroupTraining = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GroupTraining) => addGroupTraining(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAllGroupTrainingQueryKey(),
      });
    },
  });
};
