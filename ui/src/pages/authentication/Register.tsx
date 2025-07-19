import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handleLogin = async () => {};

  return (
    <Container>
      <Stack align="center" paddingTop="10rem">
        <Heading fontSize="4xl">File Uploader</Heading>

        <Stack mt="2rem" w="2xl">
          <Input placeholder="Email" />
          <Input placeholder="Password" />

          <Button>SignUp</Button>
          <ChakraLink alignSelf="flex-end">
            <Link to="/login">Login</Link>
          </ChakraLink>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SignUp;
