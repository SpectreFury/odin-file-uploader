import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useForm, type SubmitHandler } from "react-hook-form";

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log("Email: ", data.email);
    console.log("Password: ", data.password);
  };

  return (
    <Container>
      <Stack align="center" paddingTop="10rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading fontSize="4xl">File Uploader</Heading>
          <Stack mt="2rem" w="2xl">
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}

            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}

            <Button type="submit">Login</Button>
            <ChakraLink alignSelf="flex-end">
              <Link to="/register">Sign Up</Link>
            </ChakraLink>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Login;
