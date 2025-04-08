import React from "react";
import TimeframeOverview from "@/components/overview/meetings/TimeframeOverview";
import useQuery from "@/utils/useQuery";

const TimeframesPage: React.FunctionComponent = () => {
  const professionalId = useQuery("id");

  return <TimeframeOverview professionalId={Number(professionalId)} />;
};

export default TimeframesPage;
