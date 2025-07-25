interface AuthInputProps {
    label: string;
    labelColor: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AuthInput(props: AuthInputProps) {
    return (
        <div className="w-full mb-2">
            <label className={`block mb-1 text-[15px] ${props.labelColor}`}>{props.label}</label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                required={props.required}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                autoComplete="off"
                className="w-full p-2 border border-secondary rounded-[8px] outline-primary placeholder:text-[15px] placeholder:text-secondary"
            />
        </div>
    );
}