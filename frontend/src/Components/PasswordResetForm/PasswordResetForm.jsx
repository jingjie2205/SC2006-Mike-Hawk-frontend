import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import config from "../../config";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Image,
    Progress,
    Text,
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";

function PasswordResetForm() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [token, setToken] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("verification_key");
        if (token) {
            setToken(token);
        } else {
            setErrorMessage("Invalid reset link.");
        }
    }, [location]);

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

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        evaluatePasswordStrength(password);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                `${config.baseURL}/public/public/password-reset/`,
                {
                    verification_key: token,
                    new_password: newPassword,
                }
            );
            if (response.status === 200) {
                setSuccessMessage("Password reset successfully.");
                setErrorMessage(null);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setErrorMessage("Error resetting password. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Error processing your request. Please try again.");
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
                    rounded={10}
                />

                {errorMessage && (
                    <Alert status="error" mt={2}>
                        <AlertIcon />
                        <AlertTitle mr={2}>Error</AlertTitle>
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={() => setErrorMessage(null)}
                        />
                    </Alert>
                )}

                {successMessage && (
                    <Alert status="success" mt={2}>
                        <AlertIcon />
                        <AlertTitle>{successMessage}</AlertTitle>
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={() => setSuccessMessage(null)}
                        />
                    </Alert>
                )}
                <FormControl>
                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                    <Input
                        id="newPassword"
                        type="password"
                        rounded={20}
                        onChange={handlePasswordChange}
                    />
                    <Progress
                        mt={2}
                        value={passwordStrength}
                        colorScheme={
                            passwordStrength < 40 ? "red" : passwordStrength < 80 ? "yellow" : "green"
                        }
                    />

                    <Box mt={4}>
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

                    <FormLabel htmlFor="confirmPassword" mt={4}>
                        Confirm New Password
                    </FormLabel>
                    <Input
                        id="confirmPassword"
                        type="password"
                        rounded={20}
                        onChange={handleConfirmPasswordChange}
                    />

                    <Button
                        borderRadius={20}
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                        mt={4}
                        onClick={handleSubmit}
                    >
                        Reset Password
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
}

export default PasswordResetForm;
