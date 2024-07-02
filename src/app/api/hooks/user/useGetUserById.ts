import { useQuery } from "@tanstack/react-query";
import { User } from "next-auth";

const getUserById = async (id: String): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

export const useGetUserById = (ids: String) => {
  return useQuery({
    queryFn: () => getUserById(ids),
    queryKey: ["get-users-by-ids", ids],
  });
};
