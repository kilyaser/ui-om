import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

interface ActionOptionProps {
    className?: string;
    actions: string[];
    initLabel?: string;
    label: string;
    onValueChange: (value: string) => void;
}

export const ActionOption = (props: ActionOptionProps) => {
    const {
        className,
        actions,
        initLabel,
        label,
        onValueChange,
    } = props;

    const handleChange = (value: string) => {
        onValueChange(value);
    }

    return (
        <FormControl className={className} sx={{ minWidth: 145}}>
            <InputLabel id="simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={initLabel}
                label={label}
                onChange={e => handleChange(e.target.value)}
            >
                {actions.map((action) => (
                    <MenuItem key={action} value={action}>{action}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
