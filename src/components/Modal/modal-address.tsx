import * as Modal from "@/components/ui/modal";
import { Address } from "@/types/address";
import { LucideUserRoundPlus } from "lucide-react";
import React from "react";
import AddressForm from "../forms/address";

interface ModalAddressProps {
  onClose: () => void;
  setAddress: (address: any) => void;
  address?: Address;
}

const ModalAddress: React.FC<ModalAddressProps> = ({ onClose, ...props }) => {
  return (
    <>
      <Modal.Header
        title="Adicionar novo endereço"
        onClose={onClose}
        icon={<LucideUserRoundPlus />}
      />
      <div className="w-full">
        <AddressForm onClose={onClose} {...props} />
      </div>
    </>
  );
};

export default ModalAddress;
