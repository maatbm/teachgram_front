interface AuthInputProps {
    label: string;
    labelColor: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AuthInput(props: AuthInputProps) {
    return (
        <div className="w-full mb-4">
            <label className={`block mb-1 ${props.labelColor}`}>{props.label}</label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                required={props.required}
                onChange={props.onChange}
                className="w-full p-2 border border-secondary rounded-[8px] outline-primary"
            />
        </div>
    );
}