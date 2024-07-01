import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getAllGroupTrainingQueryKey } from "./groupTraining/useGetAllGroupTraining";

const useRealTimeUpdates = () => {
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const socket = io("http://localhost:4000", {});
    const handleRealtimeUpdate = () => {
      try {
        queryClient.invalidateQueries({
          queryKey: getAllGroupTrainingQueryKey(),
        });
        console.log("Queries invalidated successfully");
      } catch (error) {
        console.error("Error invalidating queries:", error);
        // Optionally handle or log the error further if needed
      }
    };

    socket.on("realtime-update-client", handleRealtimeUpdate);

    return () => {
      console.log("Disconnecting socket and cleaning up");
      socket.off("realtime-update-client", handleRealtimeUpdate);
      socket.disconnect();
    };
  }, [queryClient, socket]);

  return socket;
};

export default useRealTimeUpdates;
