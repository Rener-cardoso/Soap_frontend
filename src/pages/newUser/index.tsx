import { api } from "@/lib/axios";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function NewUser() {
  const { 
    handleSubmit, 
    register, 
    reset 
  } = useForm(); 
  
  async function handleAddContact(data: any) {
    try {
      await api.post("/create", {
        firstName: data.first_name, 
        lastName: data.last_name, 
        phoneNumber: data.phone_number,
      })
      reset();
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="w-[30rem] mx-auto pt-[3rem]">
      <h1 className="text-2xl font-bold mb-[4rem] text-center">Add Contact:</h1>
      <form onSubmit={handleSubmit(handleAddContact)} className="flex flex-col gap-[1rem] justify-center items-center">
        <input
          className="px-2 py-2 rounded-md"
          placeholder="First name" 
          type="text"
          {...register("first_name")}
        />
        <input
          className="px-2 py-2 rounded-md"
          placeholder="Last name" 
          type="text"
          {...register("last_name")} 
        />
        <input
          className="px-2 py-2 rounded-md"
          placeholder="Phone number" 
          type="text"
          {...register("phone_number")}
        />

        <div className="flex gap-1">
          <Link href={"/"} className="bg-[#9e1313] hover:bg-[#d31e1e] font-bold text-[white] px-[1rem] py-[0.5rem] rounded-md w-full">
            Voltar
          </Link>
          <button className="bg-[#009dff] px-[1.5rem] py-[0.5rem] rounded-md transition-all text-[white] font-bold hover:bg-[#009dffd2] w-full">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}