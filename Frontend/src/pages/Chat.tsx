import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";

import Aside from "@/components/Aside";
import ChatNav from "@/components/ChatNav";
import { selectUser, setUser } from "@/features/user/userSlice";
const Chat = () => {
  const url = "http://localhost:3000"
  const dispatch = useAppDispatch()

  const getUserDetails = async () => {
        console.log("Data fetching");
    const res = await fetch(`${url}/api/v1/user/userInfo`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    console.log("Data fetching")
    console.log(data.message)
    console.log(data.user);
    dispatch(setUser(data.user));

  };


  useEffect(() => {
    console.log("Useeffect is running")
    getUserDetails();
  }, [])

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  

  const user = useAppSelector(selectUser)

  const { sendMessage } = useSocket();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessages([...messages, message]);
    setMessage("");
  };
  console.log(user)

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="max-h-screen">
        <ResizablePanel className="max-w-1/2 min-w-1/4">
          <Aside />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          
          <div className="w-full">
            <ChatNav/>
            {/* messages */}
            <section className="min-h-[90vh]">
              {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </section>

            <section className="w-full mx-8">
              <form onSubmit={handleSend} className="flex gap-4 justify-center">
                <Input
                  type="text"
                  placeholder="Type a message"
                  className="w-[80vw]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  onClick={handleSend}
                  type="submit"
                  className="w-15 font-medium"
                >
                  Send
                </Button>
              </form>
            </section>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Chat;
