import { useQuery } from "@tanstack/react-query";

/**
 * getDives
 *  @description  Fetches dives from the API
 * @returns  {Promise<any>}
 */
export const getDives = async () => {
  const response = await fetch("/api/dives");
  return response.json();
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
