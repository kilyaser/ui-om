
import {classNames} from "../../../../shared/lib/classNames";
import cls from "./SidebarItem.module.scss";
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {AppLink} from "../../../../shared/ui/AppLink/AppLink.tsx";
import {SidebarItemType} from "../Sidebar/model/item.ts";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({item, collapsed}: SidebarItemProps) => {
    const {t} = useTranslation();

    return (
        <AppLink
            className={classNames(cls.item, {[cls.collapsed]: collapsed})}
            to={item.path}
        >
            <item.Icon className={cls.icon}/>
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>
    );
});
