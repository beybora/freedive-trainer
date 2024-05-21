import { Session } from "@/constants/optionsAndTypes";
import { useQuery } from "@tanstack/react-query";

/**
 * getDive
 * @description Fetches a session from the API
 * @param {string} diveId
 * @returns {Promise<Session>}
 */
export const getDive = async (diveId: string): Promise<Session> => {
  const response = await fetch(`/api/session/${diveId}`);
  return response.json();
};

export const getDiveQueryKey = () => ["dive"];

export const useGetDive = (diveId?: string) => {
  return useQuery({
    queryKey: getDiveQueryKey(),
    queryFn: () => {
      if (diveId !== undefined ) {
        return getDive(diveId);
      }
    },
  });
};

// /**
//  * useGetDive hook
//  * @returns {ReturnType<typeof useQuery>}
//  */
// export const useGetDive = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (diveId: string) => getDive(diveId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: getDivesQueryKey() });
//     },
//   });
// };
