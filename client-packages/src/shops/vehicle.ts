import * as NativeUI from "../External/NativeUI/index";
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;
let currentVehicleBuyMode = 0;
let vehicleUI: null|any = null;

// @todo add script to automatic closing NativeUI

mp.events.add("openVehicleShop", (name, buymode, data) => {
    currentVehicleBuyMode = buymode;
    const dataParsed = JSON.parse(data);

    const {x, y} = mp.game.graphics.getScreenActiveResolution(0, 0);
    // @ts-ignore
    vehicleUI = new Menu(name, "Drive, Fly and Sail Corp", new Point(x-500, Math.round(y/2-250)));

    const categories: any = {};
    for (const vehData of dataParsed) {
        if (!categories[vehData.category]) categories[vehData.category] = [];
        categories[vehData.category].push(vehData);
    }

    const bank = parseFloat(mp.players.local.getVariable("inventory.bank"));
    const money = parseFloat(mp.players.local.getVariable("inventory.money"));

    for (const category in categories) {
        if (!categories.hasOwnProperty(category)) continue;

        const item = new UIMenuItem(category,"");
        vehicleUI.AddItem(item);

        // @ts-ignore
        const subMenu = new Menu(category, "Drive, Fly and Sail Corp", new Point(x-500, Math.round(y/2-250)));
        vehicleUI.BindMenuToItem(subMenu, item);

        for (const veh of categories[category]) {
            const vehItem = new UIMenuItem(veh.displayName);
            if (veh.price === -1) {
                vehItem.Enabled = false;
                vehItem.Description = "Für dieses Fahrzeug/Flugzeug/Helicopter/Boot wurde noch kein Preis festgelegt und kann daher nicht verkauft werden.";
                vehItem.SetRightLabel("-1");
                vehItem.ForeColor = new Color(146, 146, 147, 150);
            } else if (veh.price > bank && veh.price > money) {
                vehItem.Enabled = true;
                vehItem.Description = "Du hast nicht genug Geld.";
                vehItem.SetRightLabel(veh.price.toLocaleString('de-DE', {useGrouping: true}) + " €");
                vehItem.ForeColor = new Color(255,0,0, 150);
            } else {
                vehItem.Enabled = true;
                vehItem.SetRightLabel(veh.price.toLocaleString('de-DE', {useGrouping: true}) + " €");
            }
            subMenu.AddItem(vehItem);
        }
        subMenu.Close();
    }

    vehicleUI.Open();

});

mp.events.add("MenuClose", () => {
    if (currentVehicleBuyMode > 0 && vehicleUI !== null) {
        vehicleUI = null;
        currentVehicleBuyMode = 0;
    }
});

//@todo add method for update preview and reset camera


//
// ui.ItemSelect.on((item: any) => {
//     if (item instanceof UIMenuListItem) {
//         console.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
//     } else if (item instanceof UIMenuSliderItem) {
//         console.log(item.Text, item.Index, item.IndexToItem(item.Index));
//     } else {
//         console.log(item.Text);
//     }
// });
// ui.Open();
