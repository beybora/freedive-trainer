import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getDivesQueryKey } from "@/app/api/hooks/useDives";

type OptionType = { label: string; value?: string };

type Dive = {
  discipline: OptionType;
  time: string;
  depth: string;
  mood: OptionType;
};

type Inputs = {
  dives: Dive[];
};

/**
 * addDive
 *  @description  Adds a dive to the API
 * @returns  {Promise<any>}
 */

export const addDive = async (data: Inputs) => {
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};
/**
 * useAddDive hook
 *  @description  Adds a dive to the API
 * @returns  {ReturnType<typeof useMutation>}
 */
export const useAddDive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Inputs) => addDive(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDivesQueryKey() });
    },
  });
};
