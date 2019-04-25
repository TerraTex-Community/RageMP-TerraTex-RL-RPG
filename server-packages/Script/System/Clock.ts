// set Realtime
setInterval(() => {
    const date = new Date();
    mp.world.time.set(date.getHours(), date.getMinutes(), date.getSeconds());
}, 1000);
