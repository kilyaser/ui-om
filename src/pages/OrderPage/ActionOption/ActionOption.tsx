import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

interface ActionOptionProps {
    className?: string;
}

export const ActionOption = ({className}: ActionOptionProps) => {
    const {t} = useTranslation("order");

    const handleChange = () => {}

    return (
        <FormControl className={className} sx={{ m: 2, minWidth: 145}}>
            <InputLabel id="demo-simple-select-label">{t("Действие")}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label={t("Действие")}
                onChange={handleChange}
            >
                <MenuItem value={"Delete"}>{t("Удалить")}</MenuItem>
                <MenuItem value={"ChangeState"}>{t("Сменить статус")}</MenuItem>
            </Select>
        </FormControl>
    );
};
