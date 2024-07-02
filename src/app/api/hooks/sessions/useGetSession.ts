import { Session } from "@/types/optionsAndTypes";
import { useQuery } from "@tanstack/react-query";

const getSession = async (diveId: string): Promise<Session> => {
  const response = await fetch(`/api/session/${diveId}`);
  return response.json();
};

export const getSessionsQueryKey = () => ["dive"];

export const useGetDive = (diveId?: string) => {
  return useQuery({
    queryKey: getSessionsQueryKey(),
    queryFn: () => {
      if (diveId !== undefined) {
        return getSession(diveId);
      }
    },
  });
};
