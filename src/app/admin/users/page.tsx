"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideUserRound, LucideUserRoundPlus } from "lucide-react";
import React, { useState } from "react";

import { NewUser } from "@/components/forms/users/new-user";
import Button from "@/components/ui/button";
import * as Modal from "@/components/ui/modal";
import * as Table from "@/components/ui/table";
import Typography from "@/components/ui/typography";

// import { Container } from './styles';
interface User {
  id: string;
  email: string;
  name: string;
  rules: string[];
  lastAccess: string;
}
const Users: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isLoading: isLoadingUser, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>("/api/user");
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <>
      <div className="flex flex-col w-full justify-center">
        <div className="flex w-full justify-between py-6">
          <div className="flex">
            <Typography variant="h1" className="flex gap-2">
              <LucideUserRound />
              Usuarios
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button className="flex gap-2" onClick={() => setIsOpenModal(true)}>
              <LucideUserRoundPlus size={18} />
              Adicionar novo usuário
            </Button>
          </div>
        </div>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head></Table.Head>
              <Table.Head>Usuário</Table.Head>
              <Table.Head>Ultimo Acesso</Table.Head>
              <Table.Head></Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users &&
              users.map((tag) => {
                return (
                  <Table.Row key={tag.id}>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{tag.name}</span>
                        <span className="text-xs text-zinc-500">
                          {tag.email}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-zinc-500">
                      {tag.lastAccess}
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      {/* <Button size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button> */}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table.Root>
      </div>

      <Modal.Root open={true}>
        <Modal.Header
          title="Adicionar novo usuário"
          onClose={() => setIsOpenModal(false)}
          icon={<LucideUserRoundPlus />}
        />
        <div className="mt-[10px] mb-5">
          <Typography>
            Insira o e-mail do usuário. Ele receberá um formulario para
            finalizar o cadastro.
          </Typography>
        </div>

        <NewUser />
      </Modal.Root>
    </>
  );
};

export default Users;
