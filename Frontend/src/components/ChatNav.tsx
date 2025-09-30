import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const ChatNav = () => {
  return (
    <section className="w-full flex items-center bg-red-500 justify-between mt-2 h-12">
      <div>fdd</div>
      <div className="bg-green-500 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer mr-5">
        <Avatar className="">
          <AvatarImage />
          <AvatarFallback className="bg-transparent">A </AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}

export default ChatNav