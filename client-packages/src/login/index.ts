let loginProcessBrowser :BrowserMp|null = null;

mp.events.add("login_startLoginProcess", isRegistered => {

    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    if (isRegistered) {
        loginProcessBrowser = mp.browsers.new('package://ui/index.html?page=pages/login/Login.html');
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
});

mp.events.add("browser_login_Login", pw => {
    if (!loginProcessBrowser) return;
    mp.events.callRemote("execute_login_login", pw);
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);
    loginProcessBrowser.destroy();
});

mp.events.add("browser_login_openPasswordForgotten", () => {
    if (!loginProcessBrowser) return;
    loginProcessBrowser.url = "package://ui/index.html?page=pages/login/PasswordForgotten.html";
// @todo: browser_login_openPasswordForgotten part
    mp.gui.chat.show(true);
});
