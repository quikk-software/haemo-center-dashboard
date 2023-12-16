import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/meetings/meetingTable.coldef";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useGetMeetings from "@/api/scheduling/useGetMeetings";
import useQuery from "@/utils/useQuery";

const MeetingTable: React.FC = () => {
  const router = useRouter();
  const id = useQuery("id");

  const { request } = useGetMeetings();
  const { meetings } = useSelector((store: Store) => store.meetings);

  useEffect(() => {
    if (id !== undefined) {
      request(id);
    }
  }, [router]);

  return (
    <Table
      title={`Termine für ${id}`}
      rows={meetings}
      // @ts-ignore
      columns={createColumns() ?? []}
    />
  );
};

export default MeetingTable;
