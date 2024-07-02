import { GroupTraining } from "@/types/optionsAndTypes";
import { useQuery } from "@tanstack/react-query";
import { getAllSessionsQueryKey } from "../sessions/useGetAllSessions";

const getAllGroupTraining = async (): Promise<GroupTraining[]> => {
  const response = await fetch("/api/group-training");
  return response.json();
};

export const getAllGroupTrainingQueryKey = () => ["group-training"];

export const useGetAllGroupTraining = () => {
  return useQuery({
    queryFn: getAllGroupTraining,
    queryKey: getAllGroupTrainingQueryKey(),
  });
};
