import { NextPage } from "next"
import LoginForm from "../components/Forms/LoginForm"
import { Container } from "@chakra-ui/layout"

const SignIn: NextPage = () => {
    return (
        <Container py={10}>
            <LoginForm />
        </Container>

    )
}

export default SignIn;