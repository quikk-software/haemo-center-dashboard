import React, { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/layout/LoadingScreen";

type Props = {};

const LoadingGuard: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return children;
};

export default LoadingGuard;
