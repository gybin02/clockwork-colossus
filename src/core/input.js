



function qp(s) {
  let e = new Set(),
    t = s.input,
    n = () => {
      ((t.x =
        (e.has("KeyD") || e.has("ArrowRight") ? 1 : 0) -
        (e.has("KeyA") || e.has("ArrowLeft") ? 1 : 0)),
        (t.z =
          (e.has("KeyS") || e.has("ArrowDown") ? 1 : 0) -
          (e.has("KeyW") || e.has("ArrowUp") ? 1 : 0)));
    };
  (addEventListener("keydown", (i) => {
    i.repeat ||
      (e.add(i.code),
      n(),
      i.code === "Space" && ((t.rollPressed = !0), i.preventDefault()),
      (i.code === "KeyJ" || i.code === "Enter") && (t.attackPressed = !0),
      i.code === "KeyK" && (t.jumpPressed = !0),
      (i.code === "ShiftLeft" ||
        i.code === "ShiftRight" ||
        i.code === "KeyL") &&
        (t.dashPressed = !0));
  }),
    addEventListener("keyup", (i) => {
      (e.delete(i.code), n());
    }),
    addEventListener("mousedown", (i) => {
      (i.button === 0 && (t.attackPressed = !0),
        i.button === 2 && (t.rollPressed = !0));
    }),
    addEventListener("contextmenu", (i) => i.preventDefault()));
}

export { qp, qp as setupInput };