import cls from "./Input.module.scss";
import {classNames} from "../../lib/classNames";
import {InputHTMLAttributes} from "react";



interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    value?: string;
}

export const Input = (props: InputProps) => {
    const {
        className = "form-control",
        value,
        type = "text",
        ...otherProps
    } = props;

    return (
        <div>
            <input
                className={classNames(cls.Input, {}, [className])}
                value={value}
                type={type}
                {...otherProps}
            >

            </input>
        </div>

    );
};
