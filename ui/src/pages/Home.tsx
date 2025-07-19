import { Button, Flex, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Flex justify="center" align="center">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default Home;
