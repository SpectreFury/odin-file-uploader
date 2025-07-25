import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ENDPOINTS } from "../../utils/api";
import { useUserStore } from "../../store/useUserStore";

type LoginInputs = {
  email: string;
  password: string;
};

type User = {
  id: number;
  email: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  user: User;
};

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await fetch(ENDPOINTS.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error: response is not ok");
      }

      const result: LoginResponse = await response.json();

      setUser(result.user);
      navigate("/dashboard");
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

            <Button type="submit">Login</Button>
            <Link to="/register">
              <ChakraLink alignSelf="flex-end" as="div">
                Register
              </ChakraLink>
            </Link>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Login;
