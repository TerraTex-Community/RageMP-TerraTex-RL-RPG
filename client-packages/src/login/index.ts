let loginProcessBrowser: BrowserMp|null = null;

mp.events.add("login_startLoginProcess", (isRegistered, showPwError = false) => {
    if (loginProcessBrowser) {
        loginProcessBrowser.destroy();
        loginProcessBrowser = null;
    }

    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    if (isRegistered) {
        loginProcessBrowser = mp.browsers.new('package://ui/index.html?page=pages/login/Login.html');
        if (showPwError) {
            setTimeout(() => {
                // @ts-ignore
                loginProcessBrowser.execute("showPasswordError()");
            }, 250);
        }
    } else {
        loginProcessBrowser = mp.browsers.new('package://ui/index.html?page=pages/login/Register.html');
    }

});

mp.events.add("browser_login_sendMeNickname", () => {
    if (!loginProcessBrowser) return;
    loginProcessBrowser.execute(`setPlayerNickname("${mp.players.local.name}");`);
});

mp.events.add("browser_login_register", jsonData => {
    if (!loginProcessBrowser) return;
    mp.events.callRemote("execute_login_register", jsonData);
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);
    loginProcessBrowser.destroy();
    loginProcessBrowser = null;
});

mp.events.add("browser_login_Login", pw => {
    if (!loginProcessBrowser) return;
    mp.events.callRemote("execute_login_login", pw);
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);
    loginProcessBrowser.destroy();
    loginProcessBrowser = null;
});

mp.events.add("browser_login_openPasswordForgotten", () => {
    if (loginProcessBrowser) {
        loginProcessBrowser.destroy();
        loginProcessBrowser = null;
    }
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    loginProcessBrowser = mp.browsers.new("package://ui/index.html?page=pages/login/PasswordForgotten.html");
});

mp.events.add("browser_login_passwordForgotten_getEmail", () => {
     mp.events.callRemote("execute_login_password_forgotten_getEmailHidden");
});

mp.events.add("execute_login_password_forgotten_getEmailHidden_result", mail => {
    if (!loginProcessBrowser) return;
    loginProcessBrowser.execute(`setPlayerEmail("${mail}");`);
});

mp.events.add("browser_login_passwordForgotten_sendCode", () => {
    mp.events.callRemote("login_passwordForgotten_sendCode");
});

mp.events.add("browser_login_passwordForgotten_setNewPassword", (pw, code) => {
    mp.events.callRemote("login_passwordForgotten_setNewPassword", pw, code);
});

mp.events.add("login_passwordForgotten_setCodeError", () => {
    if (!loginProcessBrowser) return;
    loginProcessBrowser.execute(`setCodeError();`);
});
