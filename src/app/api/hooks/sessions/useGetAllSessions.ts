import { useQuery } from "@tanstack/react-query";
import { Session } from "@/types/optionsAndTypes";

const getDives = async (): Promise<Session[]> => {
  const response = await fetch("/api/session");
  return response.json();
  // validate the response tzpe using zod
};

export const getAllSessionsQueryKey = () => ["dives"];

export const useGetAllSessions = () => {
  return useQuery({
    queryKey: getAllSessionsQueryKey(),
    queryFn: getDives,
  });
};