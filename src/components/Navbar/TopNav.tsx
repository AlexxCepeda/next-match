import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
} from "@nextui-org/react";
import { GiMatchTip } from "react-icons/gi";
import NavLink from "./NavLink";

export default function TopNav() {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-300 to-purple-700"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "data-[active=true]:text-yellow-300",
          "data-[active=true]:font-bold",
        ],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-200" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Next</span>
          <span className="text-gray-200">Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavLink href="/members" label="matches" />
        <NavLink href="/lists" label="lists" />
        <NavLink href="/messages" label="messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          variant="bordered"
          className="text-white"
          as={Link}
          href="/login"
        >
          Login
        </Button>
        <Button
          variant="bordered"
          className="text-white"
          as={Link}
          href="/register"
        >
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
