import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Table from "@/components/overview/table/Table";
import { createColumns } from "@/components/overview/prescriptions/prescriptionTable.coldef";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import useGetPrescriptions from "@/api/prescriptions/useGetPrescriptions";

const PrescriptionTable: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const idFromQuery =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;

  const { request } = useGetPrescriptions();
  const { prescriptions } = useSelector((store: Store) => store.prescriptions);

  useEffect(() => {
    if (idFromQuery !== undefined) {
      request(idFromQuery);
    }
  }, [router]);

  return (
    <Table
      title={`Rezepte für ${idFromQuery}`}
      rows={prescriptions}
      // @ts-ignore
      columns={createColumns() ?? []}
    />
  );
};

export default PrescriptionTable;
