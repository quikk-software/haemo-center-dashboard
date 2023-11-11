import React, { useEffect } from "react";
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

  useEffect(() => {
    if (id !== undefined) {
      request(id);
    }
  }, [router]);

  return (
    <Table
      title={`Rezepte für ${id}`}
      rows={prescriptions}
      // @ts-ignore
      columns={createColumns() ?? []}
    />
  );
};

export default PrescriptionTable;
