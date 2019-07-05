import {closeNativeMenuOnDistance, getCurrentSelectedItem} from "../helper/NativeUIHelper";
import {UIMenuItem, Menu, Point, Color} from "../External/NativeUI/index";
let currentVehicleBuyMode = 0;
let vehicleUI: null|any = null;
let currentPreviewVehicle: null|VehicleMp = null;
const previewPos = new mp.Vector3(-52.46864, -1111.139, 26.07097);
const previewHeading = 68.88418;
let vehicleCamera: CameraMp|null = null;

mp.events.add("openVehicleShop", (name, buymode, data) => {
    if (currentPreviewVehicle) {
        currentPreviewVehicle.destroy();
    }

    currentPreviewVehicle = mp.vehicles.new(mp.game.joaat("sultan"), previewPos, {heading: previewHeading});

    vehicleCamera = mp.cameras.new('vehicleShop', new mp.Vector3(-41.82806, -1109.724, 30.4378), new mp.Vector3(0,0,90), 60);
    vehicleCamera.pointAtCoord(-52.46864, -1111.139, 26.07097);
    vehicleCamera.setActive(true);

    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    currentVehicleBuyMode = buymode;
    const dataParsed = JSON.parse(data);

    const {x, y} = mp.game.graphics.getScreenActiveResolution(0, 0);
    // @ts-ignore
    vehicleUI = new Menu(name, "Drive, Fly and Sail Corp", new Point(x-500, Math.round(y/2-250)));
    closeNativeMenuOnDistance(vehicleUI, 10, onMenuVehicleShopClose);

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
                vehItem.Description = "Für dieses Fahrzeug/Flugzeug/Helicopter/Boot wurde noch kein Preis festgelegt... Coming Soon!?";
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

        subMenu.ItemSelect.on((menuItem: any) => {
            tryToBuy(menuItem);
        });
        subMenu.IndexChange.on((function (index: any): void {
            const sitem = getCurrentSelectedItem(this);
            currentPreviewVehicle.model = mp.game.joaat(sitem.Text);
        }).bind(subMenu));
    }
    vehicleUI.ItemSelect.on((menuItem: UIMenuItem) => {
        currentPreviewVehicle.model = mp.game.joaat(vehicleUI.Children.get(menuItem.Id).MenuItems[0].Text);
    });

    vehicleUI.MenuClose.on(onMenuVehicleShopClose);

    vehicleUI.Open();

});

function tryToBuy(menuItem: UIMenuItem): void {
    const veh = menuItem.Text;
    onMenuVehicleShopClose();
    mp.events.callRemote("tryToBuyVehicle", veh);
}


function onMenuVehicleShopClose(): void {
    if (currentVehicleBuyMode > 0 && vehicleUI !== null) {
        currentVehicleBuyMode = 0;

        currentPreviewVehicle.destroy();
        currentPreviewVehicle = null;

        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        vehicleCamera.destroy(true);
        vehicleCamera = null;

        vehicleUI.Children.forEach(value => value.Close());
        vehicleUI = null;
    }
}

mp.events.add("render", () => {
    if (currentPreviewVehicle) {
        currentPreviewVehicle.setHeading(currentPreviewVehicle.getHeading() + 0.333);
    }
});

