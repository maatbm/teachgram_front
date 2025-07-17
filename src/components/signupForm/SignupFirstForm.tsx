import { AuthInput } from "components";
import type React from "react";
import { type SignUpRequest } from "services/userService/user.types";

interface SignupFirstFormProps {
    user: SignUpRequest;
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SignupFirstForm(props: SignupFirstFormProps) {
    return (
        <>
            <h2 className="text-quaternary font-semibold text-[20px]">Crie sua conta</h2>
            <div className="w-full">
                <AuthInput
                    label="Nome"
                    labelColor="text-quinary"
                    type="text"
                    placeholder="Digite seu nome"
                    name="name"
                    value={props.user.name}
                    onChange={props.onChangeFunction}
                />
                <AuthInput
                    label="E-mail"
                    labelColor="text-quinary"
                    type="email"
                    placeholder="Digite seu E-mail"
                    name="mail"
                    value={props.user.mail}
                    onChange={props.onChangeFunction}
                />
                <AuthInput
                    label="Username"
                    labelColor="text-quinary"
                    type="text"
                    placeholder="@ seu_username"
                    name="username"
                    value={props.user.username}
                    onChange={props.onChangeFunction}
                />
                <AuthInput
                    label="Descrição"
                    labelColor="text-quinary"
                    type="text"
                    placeholder="Faça uma descrição"
                    name="description"
                    value={props.user.description}
                    onChange={props.onChangeFunction}
                />
                <AuthInput
                    label="Celular"
                    labelColor="text-quinary"
                    type="text"
                    placeholder="Digite seu número de celular"
                    name="phone"
                    value={props.user.phone}
                    onChange={props.onChangeFunction}
                />
                <AuthInput
                    label="Senha"
                    labelColor="text-quinary"
                    type="password"
                    placeholder="Digite sua senha"
                    name="password"
                    value={props.user.password}
                    onChange={props.onChangeFunction}
                />
            </div>
        </>
    );
}