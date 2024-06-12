import { useQuery } from "@tanstack/react-query";
import { Session } from "@/constants/optionsAndTypes";

const getDives = async (): Promise<Session[]> => {
  const response = await fetch("/api/session");
  return response.json();
  // validate the response tzpe using zod
};

export const getDivesQueryKey = () => ["dives"];

export const useDives = () => {
  return useQuery({
    queryKey: getDivesQueryKey(),
    queryFn: getDives,
  });
};