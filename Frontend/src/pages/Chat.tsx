import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";

import Aside from "@/components/Aside";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const { sendMessage } = useSocket();
  const friends = [
    "alex123",
    "john_doe",
    "mary99",
    "coder_ash",
    "sophia_k",
    "dev_master",
    "anuj45",
    "tech_girl",
    "rahul007",
    "neha_dev",
    "bjhdvsdf",
  ];

 


  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="max-w-1/2 min-w-1/4">
          <Aside friends={friends}/>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {" "}
          <div className="w-full">
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
