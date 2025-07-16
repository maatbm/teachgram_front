import { AuthInput, PrimaryButton, SigninError } from "components";
import type React from "react";
import { type SignUpRequest } from "services/userService/user.types";

interface SignupFirstFormProps {
    user: SignUpRequest;
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string;
}

export function SignupFirstForm(props: SignupFirstFormProps) {
    return (
        <form className="w-full mt-2">
            <AuthInput
                label="Nome"
                labelColor="text-quinary"
                type="text"
                placeholder="Digite seu nome"
                required={true}
                name="name"
                value={props.user.name}
                onChange={props.onChangeFunction}
            />
            <AuthInput
                label="E-mail"
                labelColor="text-quinary"
                type="email"
                placeholder="Digite seu E-mail"
                required={true}
                name="mail"
                value={props.user.mail}
                onChange={props.onChangeFunction}
            />
            <AuthInput
                label="Username"
                labelColor="text-quinary"
                type="text"
                placeholder="@ seu_username"
                required={true}
                name="username"
                value={props.user.username}
                onChange={props.onChangeFunction}
            />
            <AuthInput
                label="Descrição"
                labelColor="text-quinary"
                type="text"
                placeholder="Faça uma descrição"
                required={true}
                name="description"
                value={props.user.description}
                onChange={props.onChangeFunction}
            />
            <AuthInput
                label="Celular"
                labelColor="text-quinary"
                type="text"
                placeholder="Digite seu número de celular"
                required={true}
                name="phone"
                value={props.user.phone}
                onChange={props.onChangeFunction}
            />
            <AuthInput
                label="Senha"
                labelColor="text-quinary"
                type="password"
                placeholder="Digite sua senha"
                required={true}
                name="password"
                value={props.user.password}
                onChange={props.onChangeFunction}
            />
            {props.error && <SigninError errorLabel={props.error} />}
            <PrimaryButton label="Próximo" />
        </form>
    );
}