import { useState } from "react"
import { NextPage } from "next"
import { register } from "../service/AuthService";

const Register: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [message, setMessage] = useState('')

    const onSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            await register({
                email, password,
                firstName,
                lastName
            })
            setMessage('Succesfull register, Thank you!')

        } catch (error) {
            console.error('Register error')
        }

    }

    return (
        <div>
            <form onSubmit={onSubmit} style={{display: 'grid', gap: "5px", padding: '15px'}}>
                <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Register</button>
            </form>
            <div>
                {message}
            </div>
        </div>
    )
}

export default Register;