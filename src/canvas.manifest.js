export const manifest = {
  screens: {
    scr_eplvdr: { name: "Dashboard", route: "/", position: { "x": 160, "y": 220 } },
    scr_y6a046: { name: "Create Ticket", route: "/tickets/new", position: { "x": 1560, "y": 220 } },
    scr_fkutg0: { name: "Ticket Detail", route: "/tickets/TKT-1002", position: { "x": 2960, "y": 220 } }
  },
  sections: {
    sec_aspc0e: { name: "Ticket Management", x: 0, y: 0, width: 4320, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_aspc0e", children: [
    { kind: "screen", id: "scr_eplvdr" },
    { kind: "screen", id: "scr_y6a046" },
    { kind: "screen", id: "scr_fkutg0" }]
  }]

};