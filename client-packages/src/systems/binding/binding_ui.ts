let bindingBrowser: BrowserMp | null = null;
let sendNextKey = false;
let bindingManager = getBindingManager();


function openBindingBrowser() {
    if (bindingBrowser) {
        return;
    }

    mp.gui.cursor.show(true, true);
    mp.gui.chat.activate(false);

    bindingBrowser = mp.browsers.new('package://ui/index.html?page=pages/KeyConfiguration.html');

    setTimeout(() => {
        addBindsToUI();
    }, 250);
}

function addBindsToUI() {
    if (!bindingBrowser) {
        return;
    }

    bindingBrowser.execute("clearEntries();");

    for (const keyBind of bindingManager.getBindings()) {

        let keyName = Bindings.getNameFromKeyValue(keyBind.key);
        if (keyBind.isControl) {
            keyName = Bindings.getNameFromControlValue(keyBind.key);
        }

        bindingBrowser.execute(`addRow("${keyBind.func}", ${keyBind.key}, ${keyBind.isControl}, "${keyName}");`);
    }
}

// F3 => Binding Menü
mp.keys.bind(0x72, true, () => {
    openBindingBrowser();
});

mp.events.add('browser_bindings_close', () => {
    if (!bindingBrowser) {
        return;
    }

    sendNextKey = false;
    mp.gui.cursor.show(false, false);
    bindingBrowser.destroy();
    bindingBrowser = null;
    mp.gui.chat.activate(true);
});

mp.events.add('browser_bindings_getKey', () => {

    mp.gui.cursor.show(false, false);
    sendNextKey = true;
    bindingManager.toggleBindings(false);
});

mp.events.add('browser_bindings_reset', () => {
    bindingManager.resetToDefaultBindings();
    addBindsToUI();
});

mp.events.add('browser_bindings_save', (rawKeys) => {
    const keys = JSON.parse(rawKeys);
    const bindings:Binding[] = [];

    for(const keyBind of keys) {
        bindings.push({
            func: keyBind.content,
            isControl: keyBind.isControl,
            key: keyBind.key
        });
    }

    bindingManager.setBindings(bindings);
});

mp.events.add("script_key_pressed", (isControl: boolean, key: number) => {
    if (sendNextKey && bindingBrowser) {
        bindingManager.toggleBindings(true);
        mp.gui.cursor.show(true, true);
        if (!isControl && key === 27) {
            bindingBrowser.execute("stopWaitForKey();")
        } else {
            let keyName = Bindings.getNameFromKeyValue(key);
            if (isControl) {
                keyName = Bindings.getNameFromControlValue(key);
            }

            bindingBrowser.execute(`setNewKey("${keyName}", ${key}, ${isControl});`);
        }
        sendNextKey = false;
    }
});
