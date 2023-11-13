import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { Phone } from "@phosphor-icons/react/dist/ssr/Phone";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import Link from "next/link";

export interface UserBoxProps {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deleteUserBox: () => void;
}

export default function UserBox({ firstName, lastName, phoneNumber, deleteUserBox, id }: UserBoxProps) {

  return (
    <div className="bg-[white] border border-[gray] border-opacity-40 rounded-md p-4 flex items-center justify-between">

      <div>
        <p className="text-2xl font-bold">{firstName} {lastName}</p>
        <span className="flex items-center gap-2 text-[gray]">
          <Phone weight="fill" />
          {phoneNumber}
        </span>
      </div>

      <div className="flex gap-4">
        <Link href={`/updateUser/${id}`} className="bg-[#0080ff] hover:bg-[#0080ff97] transition-all rounded-md p-[0.5rem]">
          <PencilSimple color="blue" height={20} width={20} />
        </Link>

        <button onClick={deleteUserBox} className="bg-[#ec1b1baf] hover:bg-[#ec1b1be0] transition-all rounded-md p-[0.5rem]">
          <Trash color="#fff" height={20} width={20} weight="fill"/>
        </button>
      </div>
    </div>
  )
}