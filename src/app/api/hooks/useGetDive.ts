import { Session } from "@/constants/optionsAndTypes";
import { useQuery } from "@tanstack/react-query";

export const getDive = async (diveId: string): Promise<Session> => {
  const response = await fetch(`/api/session/${diveId}`);
  return response.json();
};

export const getDiveQueryKey = () => ["dive"];

export const useGetDive = (diveId?: string) => {
  return useQuery({
    queryKey: getDiveQueryKey(),
    queryFn: () => {
      if (diveId !== undefined) {
        return getDive(diveId);
      }
    },
  });
};
