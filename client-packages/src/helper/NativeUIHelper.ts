import {Menu, UIMenuItem, UIMenuCheckboxItem, UIMenuListItem, UIMenuSliderItem} from "../External/NativeUI/index";

const closeNativeUIColshapes: any = {};

export function closeNativeMenuOnDistance(menu: Menu, distance: number, callAfter: Function | null = null): void {
    const position = mp.players.local.position;
    const colshape = mp.colshapes.newSphere(position.x, position.y, position.z, distance);
    closeNativeUIColshapes[colshape.handle] = {
        menu, callAfter
    };
}

type uiItem = UIMenuItem | UIMenuListItem | UIMenuSliderItem | UIMenuCheckboxItem;
export function getCurrentSelectedItem(menu: Menu): null | uiItem {
    for(const menuItem of menu.MenuItems) {
        if (menuItem.Selected) return menuItem;
    }
    return null;
}

mp.events.add(RageEnums.EventKey.PLAYER_EXIT_COLSHAPE, (shape: ColshapeMp) => {
    if (closeNativeUIColshapes[shape.handle]) {
        const menu: Menu = closeNativeUIColshapes[shape.handle].browser;
        const callAfter: Function | null = closeNativeUIColshapes[shape.handle].callAfter;
        try {
            menu.Children.forEach(value => value.Close());
            menu.Close();

            delete closeNativeUIColshapes[shape.handle];
            shape.destroy();
            if (callAfter) {
                callAfter();
            }
        } catch (e) {
            console.error(e);
        }
    }
});

