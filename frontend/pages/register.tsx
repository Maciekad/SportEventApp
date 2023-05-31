import { useState } from "react"
import { NextPage } from "next"
import RegisterForm from "../components/Forms/RegisterForm"
import { Container } from "@chakra-ui/react"

const Register: NextPage = () => {
    return (
        <Container py={10}>
            <RegisterForm />
        </Container>
    )
}

export default Register;