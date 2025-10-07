import React, { useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ArrowRight } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { selectFriends } from "@/features/friends/friendsSlice";

const Aside = () => {
  const friends = useAppSelector(selectFriends)
  const [search, setSearch] = useState<string>("");
  const [filteredFriends, setFilteredFriends] = useState<string[]>(friends);
  const [searchOnChatify, setSearchOnChatify] = useState<boolean>(false);
  const url = "http://localhost:3000";
  const [searchedUsers, setSearchedUsers] = useState<>(null)
  

  const searchPeople = async () => {
    //? Seaarch the matching username or name on DB
    const res =await fetch(`${url}/api/v1/user/search?search=${search}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json()
    console.log(data.users);
    
  };

  const searchFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (searchValue === "") {
      setSearchOnChatify(false);
    } else {
      setSearchOnChatify(true);
    }

    const filtered = friends.filter((friend) =>
      friend.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

  return (
    <>
      <div className="mx-2 mt-4 relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-10"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => searchFriends(e)}
        />
      </div>
      <div className="w-full flex flex-col gap-3 max-h-[90vh] overflow-y-scroll mt-4">
        {filteredFriends.map((friend, index) => (
          <Card
            className=" mx-2 h-14 flex justify-center cursor-pointer"
            key={index}
          >
            <CardContent className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  {/*friend.charAt(0).toUpperCase()*/}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{friend}</CardTitle>
            </CardContent>
          </Card>
        ))}
        {searchOnChatify && (
          <h4
            onClick={() => searchPeople()}
            className="scroll-m-20 text-xl cursor-pointer flex items-center justify-center gap-2 text-muted-foreground text-center font-semibold tracking-tight"
          >
            Search on Chatify <ArrowRight />
          </h4>
        )}
      </div>
    </>
  );
};

export default Aside;
