import {randomNumbers} from "../../Helper/NumberHelper";
import {createScriptedVehicle} from "./ScriptedVehicle";

function getBaseRookieVehOptions(heading: number): any {
    return {
        heading,
        numberPlate: "ROOKIE",
        alpha: 255,
        color: [randomNumbers(0, 255, 3), randomNumbers(0, 255, 3)],
        locked: false,
        engine: false,
        dimension: 0
    };
}


createScriptedVehicle(mp.joaat("faggio"), new mp.Vector3(296.731171, -1179.04529, 28.88412), getBaseRookieVehOptions(141.525116), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("faggio"), new mp.Vector3(298.578278, -1178.75635, 28.8814621), getBaseRookieVehOptions(136.83107), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("faggio3"), new mp.Vector3(300.740967, -1178.64014, 28.88448), getBaseRookieVehOptions(134.169952), {
    autoRespawn: true,
    idleRespawn: true
});

createScriptedVehicle(mp.joaat("faggio"), new mp.Vector3(302.906158, -1178.44751, 28.8839283), getBaseRookieVehOptions(125.943192), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("faggio3"), new mp.Vector3(303.970978, -1179.64014, 28.9428444), getBaseRookieVehOptions(130.697021), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("faggio3"), new mp.Vector3(304.376678, -1181.7301, 28.8405571), getBaseRookieVehOptions(122.46537), {
    autoRespawn: true,
    idleRespawn: true
});


createScriptedVehicle(mp.joaat("faggio"), new mp.Vector3(304.280182, -1183.55994, 28.8393173), getBaseRookieVehOptions(123.103973), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("faggio"), new mp.Vector3(304.379578, -1185.31812, 28.8399849), getBaseRookieVehOptions(116.56395), {
    autoRespawn: true,
    idleRespawn: true
});

createScriptedVehicle(mp.joaat("bmx"), new mp.Vector3(291.049957, -1208.726, 28.6792774), getBaseRookieVehOptions(-101.332367), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("bmx"), new mp.Vector3(291.055756, -1207.61035, 28.6794548), getBaseRookieVehOptions(-99.67836), {
    autoRespawn: true,
    idleRespawn: true
});

createScriptedVehicle(mp.joaat("cruiser"), new mp.Vector3(291.0148, -1206.528, 28.8737717), getBaseRookieVehOptions(-99.2768555), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("cruiser"), new mp.Vector3(291.0581, -1205.42065, 28.8735085), getBaseRookieVehOptions(-103.867561), {
    autoRespawn: true,
    idleRespawn: true
});

createScriptedVehicle(mp.joaat("scorcher"), new mp.Vector3(290.969727, -1204.28992, 28.9529419), getBaseRookieVehOptions(-105.642082), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("scorcher"), new mp.Vector3(291.0428, -1203.20447, 28.9535027), getBaseRookieVehOptions(-106.642509), {
    autoRespawn: true,
    idleRespawn: true
});

createScriptedVehicle(mp.joaat("tribike"), new mp.Vector3(291.0772, -1202.23914, 28.9062328), getBaseRookieVehOptions(-107.754646), {
    autoRespawn: true,
    idleRespawn: true
});
createScriptedVehicle(mp.joaat("tribike"), new mp.Vector3(291.041321, -1201.35974, 28.9056263), getBaseRookieVehOptions(-114.534142), {
    autoRespawn: true,
    idleRespawn: true
});
