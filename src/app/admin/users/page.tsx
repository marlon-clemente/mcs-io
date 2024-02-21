"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideMail, LucidePlus, LucideUser } from "lucide-react";
import React, { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

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

  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>("/api/user");
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <>
      <Dialog.Root open={isOpenModal}>
        <div className="flex flex-col w-full justify-center">
          <div className="flex w-full justify-between">
            <div className="flex">
              <LucideUser />
              <h1 className="font-bold">Usuarios</h1>
            </div>

            <Dialog.Trigger asChild>
              <button className="flex" onClick={() => setIsOpenModal(true)}>
                <LucidePlus />
                Adicionar novo usuário
              </button>
            </Dialog.Trigger>
          </div>
          <div className="mt-4 gap-2">
            {data?.map((user) => (
              <div
                className="flex flex-col p-4 bg-gray-300 rounded"
                key={user.id}
              >
                <span className="font-bold">{user.name}</span>
                <div className="flex items-center gap-1">
                  <span>
                    <LucideMail size={13} />
                  </span>
                  <span>{user.email}</span>
                </div>
                <span>{user.lastAccess}</span>
              </div>
            ))}
          </div>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <h1>teste</h1>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Users;