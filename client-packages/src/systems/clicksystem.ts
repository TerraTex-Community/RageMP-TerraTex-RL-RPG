// let clickDebug = false;
// let lastEntity: EntityMp | null = null;
//
// // trigger also to server
// mp.events.add('click', (x, y, upOrDown, leftOrRight) => {
//     let pos3d = mp.game.graphics.screen2dToWorld3d([x, y]);
//     const camera = mp.cameras.new("gameplay"); // gets the current gameplay camera
//     let position = camera.getCoord();
//
//     const end = lerp(position, pos3d, 5);
//     //@ts-ignore
//     const result = mp.raycasting.testPointToPoint(position, end, null, -1);
//
//     if (result && clickDebug) {
//         mp.gui.chat.push("clicked on entity");
//         console.log("result: ", result);
//         console.log("result: ", typeof result.entity);
//
//         // @ts-ignore
//         console.log("object in general", mp.objects.atRemoteId(result.entity));
//     } else if (clickDebug) {
//         mp.gui.chat.push("clicked on non entity");
//     }
//
//     console.log(mp.objects);
//
//     mp.events.callRemote('playerClick', x, y, upOrDown, leftOrRight, result ? result.entity : null);
// });
//
// function lerp(v1: Vector3Mp, v2: Vector3Mp, t: number) {
//     let vr = new mp.Vector3(v1.x, v1.y, v1.z);
//     vr.x = v1.x + (v2.x - v1.x) * t;
//     vr.y = v1.y + (v2.y - v1.y) * t;
//     vr.z = v1.z + (v2.z - v1.z) * t;
//     return vr;
// }
//
// mp.events.add('debug_click', () => {
//     // if (lastEntity) {
//     //     lastEntity.alpha = 255;
//     // }
//
//     lastEntity = null;
//     clickDebug = !clickDebug;
//     mp.gui.chat.push(clickDebug ? "click debug enabled" : "click debug disabled");
// });
