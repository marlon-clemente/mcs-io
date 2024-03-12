"use client";

import NewBusinessSector from "@/components/forms/business-sector/new";
import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import * as Modal from "@/components/ui/modal";
import * as Table from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucidePlusCircle } from "lucide-react";
import React, { useState } from "react";

interface BusinessSector {
  id: string;
  name: string;
  color: string;
}

const BusinessSector: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const { data } = useQuery<BusinessSector[]>({
    queryKey: ["business-sector"],
    queryFn: async () => {
      const response = await axios.get<{ bussinesSectores: BusinessSector[] }>(
        "/api/business-sector"
      );
      console.log(response.data);
      return response.data.bussinesSectores;
    },
  });

  return (
    <div className="flex flex-col w-full">
      <Typography variant="h1">Ramo de Atividade</Typography>
      <Divider />

      <div className="flex w-full justify-end items-end my-3">
        <Button type="button" onClick={handleOpenModal}>
          Adicionar novo
        </Button>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Ramo de atividade</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            data.map((business) => {
              return (
                <Table.Row key={business.id}>
                  <Table.Cell className="text-zinc-500 items-center flex gap-2">
                    <div
                      style={{ backgroundColor: business.color }}
                      className="rounded-full w-4 h-4"
                    />
                    {business.name}
                  </Table.Cell>
                  <Table.Cell className="text-right"></Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>

      <Modal.Root open={isOpenModal}>
        <Modal.Header
          title="Adicionar novo ramo de atividade"
          onClose={() => setIsOpenModal(false)}
          icon={<LucidePlusCircle />}
        />

        <NewBusinessSector closeModal={() => setIsOpenModal(true)} />
      </Modal.Root>
    </div>
  );
};

export default BusinessSector;
