import { useQuery } from "@tanstack/react-query";
import { Session } from "@/constants/optionsAndTypes";

/**
 * getDives
 *  @description  Fetches sessions from the API
 * @returns  {Promise<Session[]>}
 */
export const getDives = async (): Promise<Session[]> => {
  const response = await fetch("/api/session");
  return response.json();
  // validate the response tzpe using zod
};

export const getDivesQueryKey = () => ["dives"];

/**
 * useDives hook
 *  @description  Fetches dives from the API
 * @returns  {ReturnType<typeof useQuery>}
 */
export const useDives = () => {
  return useQuery({ queryKey: getDivesQueryKey(), queryFn: getDives });
};
