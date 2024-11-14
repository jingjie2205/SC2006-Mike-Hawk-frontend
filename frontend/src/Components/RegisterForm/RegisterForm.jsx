import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Image,
    Link,
    Spinner,
    useToast,
    Progress,
    Text,
    List,
    ListItem,
    ListIcon,
} from "@chakra-ui/react";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import config from "../../config";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        email: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setSubmitted(false);
        setError("");
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const evaluatePasswordStrength = (password) => {
        const criteria = {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[^A-Za-z0-9]/.test(password),
        };

        setPasswordCriteria(criteria);

        const strength = Object.values(criteria).filter(Boolean).length;
        const strengthPercent = (strength / Object.keys(criteria).length) * 100;
        setPasswordStrength(strengthPercent);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { name, password, confirmPassword, email } = formData;

        if (!name || !password || !confirmPassword || !email) {
            setError("Please fill all fields.");
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            setError("Invalid email format.");
            setLoading(false);
            return;
        }
        if (passwordStrength < 80) {
            setError("Password strength must be at least 80%.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${config.baseURL}/public/public/register`, {
                userName: name,
                password,
                emailAddress: email,
            });

            if (response.status === 200) {
                setSubmitted(true);
                toast({
                    title: "Verification Email Sent",
                    description: "Please verify your email to complete registration.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError("Username/Email already in use.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            bgGradient="linear(to-r, teal.500, green.500)"
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
        >
            <Box
                w={["full", "md"]}
                p={[8, 10]}
                mx="auto"
                borderRadius={10}
                boxShadow="md"
                bg="white"
            >
                <Image
                    src="./public/RQ.png"
                    alt="ReportQuest Logo"
                    width="100%"
                    rounded={10}
                    paddingBottom={3}
                />
                
                <div className="messages">
                    {error && (
                        <Box border="3px solid red" padding={2} borderRadius={5} mb={4}>
                            <Text color="red.500">{error}</Text>
                        </Box>
                    )}
                    {submitted && (
                        <Box border="3px solid green" padding={2} borderRadius={5} mb={4}>
                            <Text color="green.500">Successfully Registered</Text>
                        </Box>
                    )}
                </div>

                <FormControl>
                    <FormLabel htmlFor="name">Username</FormLabel>
                    <Input
                        id="name"
                        type="text"
                        rounded={20}
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                    
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        rounded={20}
                        onChange={(e) => {
                            handleChange(e);
                            evaluatePasswordStrength(e.target.value);
                        }}
                        value={formData.password}
                        required
                    />
                    <Progress
                        mt={2}
                        width="100%"
                        value={passwordStrength}
                        colorScheme={
                            passwordStrength < 40 ? "red" : passwordStrength < 80 ? "yellow" : "green"
                        }
                    />

                    <Box mt={4} w="100%">
                        <Text fontWeight="bold">Password must contain:</Text>
                        <List spacing={1} mt={2}>
                            <ListItem>
                                <ListIcon as={passwordCriteria.minLength ? FaRegCheckSquare : FaRegSquare} color={passwordCriteria.minLength ? "green.500" : "red.500"} />
                                Minimum 8 characters
                            </ListItem>
                            <ListItem>
                                <ListIcon as={passwordCriteria.hasUpperCase ? FaRegCheckSquare : FaRegSquare} color={passwordCriteria.hasUpperCase ? "green.500" : "red.500"} />
                                At least one uppercase letter
                            </ListItem>
                            <ListItem>
                                <ListIcon as={passwordCriteria.hasLowerCase ? FaRegCheckSquare : FaRegSquare} color={passwordCriteria.hasLowerCase ? "green.500" : "red.500"} />
                                At least one lowercase letter
                            </ListItem>
                            <ListItem>
                                <ListIcon as={passwordCriteria.hasNumber ? FaRegCheckSquare : FaRegSquare} color={passwordCriteria.hasNumber ? "green.500" : "red.500"} />
                                At least one number
                            </ListItem>
                            <ListItem>
                                <ListIcon as={passwordCriteria.hasSpecialChar ? FaRegCheckSquare : FaRegSquare} color={passwordCriteria.hasSpecialChar ? "green.500" : "red.500"} />
                                At least one special character
                            </ListItem>
                        </List>
                    </Box>

                    <FormLabel htmlFor="confirmPassword" mt={4}>Confirm Password</FormLabel>
                    <Input
                        id="confirmPassword"
                        type="password"
                        rounded={20}
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        required
                    />
                    
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        rounded={20}
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />

                    <Button
                        borderRadius={20}
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                        mt={4}
                        onClick={handleSubmit}
                        isDisabled={loading}
                    >
                        {loading ? <Spinner size="sm" /> : "SIGN UP"}
                    </Button>
                    <FormLabel textAlign={"center"} mt={2}>
                        <Link as={RouterLink} to="/login" color="blue.400" _hover={{ color: "blue.600" }}>
                            Already have an account?
                        </Link>
                    </FormLabel>
                </FormControl>
            </Box>
        </Box>
    );
};

export default RegisterForm;
