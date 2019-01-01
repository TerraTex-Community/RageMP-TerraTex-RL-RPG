let loginProcessBrowser :BrowserMp|null = null;

mp.events.add("startLoginProcess", (isLogin:boolean) => {
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    if (isLogin) {
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
    console.log(jsonData);
    mp.gui.chat.push(jsonData);
    mp.gui.chat.show(true);
});

// @todo: browser_login_Login
// @todo: browser_login_register
// @todo: browser_login_openPasswordForgotten
