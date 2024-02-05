import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/prescriptions/prescriptionTable.coldef";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useGetPrescriptions from "@/api/prescriptions/useGetPrescriptions";
import useQuery from "@/utils/useQuery";

const PrescriptionTable: React.FC = () => {
  const router = useRouter();
  const id = useQuery("id");

  const { request } = useGetPrescriptions();
  const { prescriptions } = useSelector((store: Store) => store.prescriptions);

  const { users } = useSelector((state: Store) => state.userOverview);

  useEffect(() => {
    if (id !== undefined) {
      request(id);
    }
  }, [router]);

  const name = useMemo(() => {
    const user = users.find((u) => u.id === id);
    return `${user?.firstName} ${user?.lastName}`;
  }, [users]);

  return (
    <Table
      title={`Rezepte für ${name}`}
      rows={prescriptions}
      // @ts-ignore
      columns={createColumns() ?? []}
      paginationMode="client"
    />
  );
};

export default PrescriptionTable;
