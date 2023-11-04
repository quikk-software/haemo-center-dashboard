import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/meetings/meetingTable.coldef.";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useGetMeetings from "@/api/scheduling/useGetMeetings";

const MeetingTable: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const idFromQuery =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";

  const { request } = useGetMeetings();
  const { meetings } = useSelector((store: Store) => store.meetings);

  useEffect(() => {
    if (idFromQuery !== undefined) {
      request(idFromQuery);
    }
  }, [router]);

  return (
    <Table
      title={`Termine für ${idFromQuery}`}
      rows={meetings}
      // @ts-ignore
      columns={createColumns() ?? []}
    />
  );
};

export default MeetingTable;
