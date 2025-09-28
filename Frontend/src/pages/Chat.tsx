import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";


const Chat = () => {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
  const {sendMessage} = useSocket()

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(message)
    setMessages([...messages, message])
    setMessage("")
  }
  return (
    <>
      <div className="w-full">
        <section>
          <h1 className="text-3xl text-center w-full font-bold underline">
            Chat Page
          </h1>
        </section>

        {/* messages */}
        <section className="min-h-[85vh]">
         { messages.map((msg, index) => (
           <div key={index}>{msg}</div>
          ))}
        </section>

        <section className="w-full">
          <form onSubmit={handleSend} className="flex gap-4 justify-center">
            <Input
              type="text"
              placeholder="Type a message"
              className="w-[80vw]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSend} type="submit" className="w-15 font-medium">
              Send
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Chat