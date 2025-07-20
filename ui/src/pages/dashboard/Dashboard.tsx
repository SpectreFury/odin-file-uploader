import { Button, Container, Flex } from "@chakra-ui/react";
import { ENDPOINTS } from "../../utils/api";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch(ENDPOINTS.auth.logout, {
      method: "POST",
    });

    if (!response.ok) throw new Error("Error: response is not ok");

    setUser(null)
    navigate("/login");
  };

  return (
    <Container>
      <Flex justify="center" align="center">
        Logged in
      </Flex>

      <Button bg="red.500" onClick={handleLogout}>Log out</Button>
    </Container>
  );
};

export default Dashboard;
