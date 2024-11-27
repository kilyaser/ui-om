import {classNames} from "../../../../shared/lib/classNames";
import cls from "./Sidebar.module.scss";

import {memo, useState} from "react";
import {Button} from "../../../../shared/ui/Button/Button.tsx";
import {SidebarItemsList} from "./model/item.ts";
import {SidebarItem} from "../SidebarItem/SidebarItem.tsx";
import {LangSwitcher} from "../../../../shared/ui/LangSwitcher";

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({className}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed(prev => !prev);
    }


    return (
        <div
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <Button
                onClick={onToggle}
                className={cls.collapseBtn}
                square={true}
            >
                {collapsed ? ">" : "<"}
            </Button>
            <div className={cls.items}>
                {SidebarItemsList.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.path}
                    />
                ))}
            </div>
            <div className={cls.switchers}>
                <LangSwitcher/>
            </div>
        </div>
    );
});
