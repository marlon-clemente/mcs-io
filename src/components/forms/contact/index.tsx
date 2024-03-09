import { InputText } from "@/components/ui/fields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/fields/input-select";
import Typography from "@/components/ui/typography";
import { CONTACT, Contact } from "@/types/contact";
import { useState } from "react";

interface ContactFormProps {
  onChange: () => void;
  value: Contact;
}

export function ContactForm({ onChange, value }: ContactFormProps) {
  const [contact, setContact] = useState<Contact>();

  return (
    <div className="flex">
      <div>
        <Typography variant="formLabel">Selecione o tipo de contato</Typography>
        <Select>
          <SelectTrigger aria-label="Page" />
          <SelectContent>
            {CONTACT.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <InputText label="Informação" value={contact?.value} />
      </div>
    </div>
  );
}
