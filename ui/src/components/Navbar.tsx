import {
  Button,
  Text,
  Flex,
  Avatar,
  AvatarGroup,
  Container,
} from "@chakra-ui/react";
import { ENDPOINTS } from "../utils/api";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(ENDPOINTS.auth.logout, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Error: response is not ok");

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav style={{ backgroundColor: "#262626", padding: "1rem" }}>
      <Container>
        <Flex justify="space-between" align="center">
          <Text color="white" fontWeight="bold" fontSize="xl">
            File Uploader
          </Text>
          {user && (
            <Flex gap={2} align="center">
              <AvatarGroup>
                <Avatar.Root>
                  <Avatar.Fallback name="Ayush" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
              </AvatarGroup>
              <Button size="xs" bg="red.500" onClick={handleLogout}>
                Log out
              </Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
