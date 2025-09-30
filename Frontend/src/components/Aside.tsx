import React, {useState} from 'react'
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from './ui/input';

const Aside = ({friends}: {friends: string[]}) => {
  const [search, setSearch] = useState<string>("");
    const [filteredFriends,  setFilteredFriends] = useState<string[]>(friends);
  const searchFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      
      const filtered = friends.filter(friend => friend.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilteredFriends(filtered)
    }

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
                      {friend.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{friend}</CardTitle>
                </CardContent>
              </Card>
            ))}
      </div>
      </>
  )
}

export default Aside