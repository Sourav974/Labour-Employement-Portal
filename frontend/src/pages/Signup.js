import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  signupSelector,
  clearState,
} from "../redux/slices/SignupSlice";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short!")
    .max("50", "Too long!")
    .required("First Name Required"),

  lastName: Yup.string()
    .min(2, "Too short!")
    .max("50", "Too long!")
    .required("Last Name Required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is reqired"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(signupSelector);

  const handleSubmit = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate("/");
    }
  });

  const backgroundColor = useColorModeValue("dark.50", "dark.800");
  const backgroundColor2 = useColorModeValue("white", "gray.700");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={backgroundColor2}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form>
              <Box rounded={"lg"} bg={backgroundColor} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <Field name="firstName">
                        {({ field, form, meta }) => (
                          <FormControl isInvalid={meta.error && meta.touched}>
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" {...field} />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="lastName">
                        {({ field, form, meta }) => (
                          <FormControl isInvalid={meta.error && meta.touched}>
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" {...field} />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </HStack>
                  <Field name="email">
                    {({ field, form, meta }) => (
                      <FormControl
                        id="email"
                        isInvalid={meta.error && meta.touched}
                        isRequired
                      >
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" {...field} />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form, meta }) => (
                      <FormControl
                        id="password"
                        isInvalid={meta.error && meta.touched}
                        isRequired
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />

                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Stack spacing={10} pt={2}>
                    {isFetching ? (
                      <Button
                        isLoading
                        loadingText="Signing up"
                        type="submit"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Sign up
                      </Button>
                    ) : (
                      <Button
                        loadingText="Submitting"
                        type="submit"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Sign up
                      </Button>
                    )}
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link color={"blue.400"} href="/login">
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
