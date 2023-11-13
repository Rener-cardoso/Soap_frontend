import { api } from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateUser() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    async function handleDetails() {
      try {
        const response = await api.get(`/details/${router.query.id}`)

        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setPhoneNumber(response.data.phoneNumber)
      } catch (error) {
        console.log(error)
      }
    }
    handleDetails();
  }, [router.query.id])
  
  async function handleUpdate() {
    try {
      await api.put(`/update/${router.query.id}`, {
        firstName,
        lastName,
        phoneNumber,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[30rem] mx-auto pt-[3rem]">
      <h1 className="text-2xl font-bold mb-[4rem] text-center">Update Contact:</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-[1rem] justify-center items-center">
        <input
          value={firstName}
          className="px-2 py-2 rounded-md"
          placeholder="First name" 
          type="text"
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          value={lastName}
          className="px-2 py-2 rounded-md"
          placeholder="Last name" 
          type="text"
          onChange={e => setLastName(e.target.value)}
        />
        <input
          value={phoneNumber}
          className="px-2 py-2 rounded-md"
          placeholder="Phone number" 
          type="text"
          onChange={e => setPhoneNumber(e.target.value)}
        />

        <div className="flex gap-1">
          <Link href={"/"} className="bg-[#9e1313] hover:bg-[#d31e1e] font-bold text-[white] px-[1rem] py-[0.5rem] rounded-md w-full">
            Voltar
          </Link>
          <button className="bg-[#009dff] px-[1rem] py-[0.5rem] rounded-md transition-all text-[white] font-bold hover:bg-[#009dffd2] w-full">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}