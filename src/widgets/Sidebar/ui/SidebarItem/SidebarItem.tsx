
import {classNames} from "../../../../shared/lib/classNames";
import cls from "./SidebarItem.module.scss";
import {memo} from "react";
import {AppLink} from "../../../../shared/ui/AppLink/AppLink";
import {SidebarItemType} from "../Sidebar/model/item";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({item, collapsed}: SidebarItemProps) => {

    return (
        <AppLink
            className={classNames(cls.item, {[cls.collapsed]: collapsed})}
            to={item.path}
        >
            <item.Icon className={cls.icon}/>
            <span className={cls.link}>
                {item.text}
            </span>
        </AppLink>
    );
});
