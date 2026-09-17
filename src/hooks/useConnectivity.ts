import { useEffect } from "react";
import * as Network from "expo-network";
import { useConnectivityStore } from "../stores/useConnectivityStore";

export function useConnectivity() {
  const isOnline = useConnectivityStore((s) => s.isOnline);
  const setOnline = useConnectivityStore((s) => s.setOnline);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const state = await Network.getNetworkStateAsync();

        setOnline(
          state.isConnected === true &&
          state.isInternetReachable !== false
        );
      } catch (error) {
        console.log("Network check failed:", error);
      }
    };

    checkConnection();

    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, [setOnline]);

  return { isOnline };
}