import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getAllGroupTrainingQueryKey } from "./groupTraining/useGetAllGroupTraining";

const useRealTimeUpdates = () => {
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState(undefined);
  const port = process.env.SOCKET_SERVER_URL || "http://localhost:4000";
  useEffect(() => {
    const socket = io(port, {});
    const handleRealtimeUpdate = () => {
      try {
        queryClient.invalidateQueries({
          queryKey: getAllGroupTrainingQueryKey(),
        });
        console.log("Queries invalidated successfully");
      } catch (error) {
        console.error("Error invalidating queries:", error);
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
