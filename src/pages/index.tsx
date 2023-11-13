import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { AddressBook } from "@phosphor-icons/react/dist/ssr/AddressBook";
import UserBox, { UserBoxProps } from "@/components/UserBox";
import { api } from "@/lib/axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";

export default function Page() {
  const { userInformation, getUserInformation } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [userFiltered, setUserFiltered] = useState<UserBoxProps[]>([])

  useEffect(() => {
    getUserInformation()
  }, [])

  useEffect(() => {
    async function searchUser() {
      try {
        const response = await api.get(`/search/${search}`)
        setUserFiltered(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    searchUser()
  }, [search])

  async function handleDelete(id: string) {
    try {
      await api.delete(`/delete/${id}`)
      getUserInformation();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[54rem] mx-auto pt-[3rem]">
      <header className="text-5xl font-bold flex items-center gap-[1rem] justify-center">
        <AddressBook weight="fill" height={55} width={55} />
        <h1>Phone Book App</h1>
      </header>
      <main>
        <div className="flex justify-between mt-[5rem]">
          <span className="text-3xl font-bold">Contacts</span>
          <Link href={"/newUser"} className="bg-[#009dff] px-[1.5rem] py-[0.5rem] rounded-md transition-all text-[white] font-bold hover:bg-[#009dffd2] flex items-center gap-[0.5rem]">
            <Plus color="#ffffff" height={17} width={17} weight="bold" />
            Add Contact
          </Link>
        </div>
        <div className="bg-[white] my-[2rem] rounded-md flex items-center px-[1rem] py-[0.5rem]">
          <MagnifyingGlass weight="bold" />
          <input
            type="text" 
            placeholder="Search for contact by last name..." 
            className="inputSearch w-full bg-[transparent] px-2 py-2" 
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div>
          {userFiltered.length > 0 ? (
            userFiltered.map(info => {
              return (
                <UserBox
                  key={info.id}
                  id={info.id}
                  firstName={info.firstName} 
                  lastName={info.lastName} 
                  phoneNumber={info.phoneNumber}
                  deleteUserBox={() => handleDelete(String(info.id))}
              />
              )
            })
          ) : 
            userInformation.map(info  => {
              return (
                <UserBox
                  key={info.id}
                  id={info.id}
                  firstName={info.firstName} 
                  lastName={info.lastName} 
                  phoneNumber={info.phoneNumber}
                  deleteUserBox={() => handleDelete(String(info.id))}
                />
              )
            })}
          
          
        </div>
        
      </main>
    </div>
  )
}