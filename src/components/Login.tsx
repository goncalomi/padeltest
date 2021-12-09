import React, { useRef, useState } from 'react';

interface LoginProps {
    loginUser: (email: string, password: string) => void;
}

export const Login: React.FC<LoginProps> = ({ loginUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser(email, password);
        e.currentTarget.reset();
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit} >
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit"/>
            </form>
        </div>
    )
}
