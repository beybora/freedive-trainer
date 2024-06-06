"use client";

import React, { useContext, useState } from "react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { useSession, signOut } from "next-auth/react";
import ProfileModal from "./ProfileModal";
import Logo from "../assets/logo.png";

import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

const NavBar = () => {
  const { data: session } = useSession();
  console.log("session", session);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  if (!session) return null;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="black"
      width="100%"
      padding="5px 10px 5px 10px"
      borderColor={"darkgreen"}
    >
      <Box>
        <img
          src={Logo.src}
          alt="Logo"
          style={{ height: "50px", width: "auto" }}
        />
      </Box>
      <Box display="flex" gap="10px">
        {/* <Menu>
          <MenuButton>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
        </Menu> */}
        <Menu>
          <MenuButton
            as={Button}
            borderRadius={"14"}
            bg="white"
            rightIcon={<ChevronDownIcon />}
          >
            <Avatar
              size="sm"
              cursor="pointer"
              name={session?.user?.name ?? "User"}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={openProfileModal}>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />
    </Box>
  );
};

export default NavBar;
