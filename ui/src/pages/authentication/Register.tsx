import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ENDPOINTS } from "../../utils/api";

type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      if (data.password !== data.confirmPassword)
        throw new Error("Error: Passwords are not matching");

      const response = await fetch(ENDPOINTS.auth.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      if (!response.ok) {
        throw new Error("Error: response is not ok");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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

            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirmPassword && (
              <Text color="red.500">{errors.confirmPassword.message}</Text>
            )}

            <Button type="submit">Register</Button>
            <Flex alignSelf="flex-end">
              <Link to="/login">
                <ChakraLink as="div">Login</ChakraLink>
              </Link>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Register;
