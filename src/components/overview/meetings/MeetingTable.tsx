import React from "react";
import { useRouter } from "next/router";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/meetings/meetingTable.coldef.";

const MeetingTable: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const idFromQuery =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";

  return (
    <Table
      title={`Termine für ${idFromQuery}`}
      rows={[]}
      // @ts-ignore
      columns={createColumns() ?? []}
    />
  );
};

export default MeetingTable;
