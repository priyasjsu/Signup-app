import { InputHTMLAttributes, FC } from "react";

import '../../App.css';

type FromInputProps = { label: string } &
InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FromInputProps> = ({label, ...inputProps}) => {
    return(
        <div className="group">
            <input {...inputProps}/>
        {
            label && 
            <div className="form-input-label">
                {label}
            </div>
        }
        </div>
    )
}

export default FormInput;