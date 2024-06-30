import { getMemberByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

export default function ChatPage() {
  return (
    <>
      <CardHeader className="text-2x; font-semibold text-secondary">
        Chat
      </CardHeader>
      <Divider />
      <CardBody>Chat go here</CardBody>
    </>
  );
}
