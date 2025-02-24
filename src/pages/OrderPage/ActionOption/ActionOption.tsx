import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

interface ActionOptionProps {
    className?: string;
    actions: string[];
    initLabel?: string;
}

export const ActionOption = (props: ActionOptionProps) => {
    const {t} = useTranslation("order");
    const {
        className,
        actions,
        initLabel,
    } = props;

    const handleChange = () => {}

    return (
        <FormControl className={className} sx={{ m: 2, minWidth: 145}}>
            <InputLabel id="simple-select-label">{t("Действие")}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label={t("Действие")}
                onChange={handleChange}
            >
                {actions.map((action) => (
                    <MenuItem value={action}>{action}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
