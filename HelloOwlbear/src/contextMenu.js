import OBR from "@owlbear-rodeo/sdk";

const id='com.helloOwlbear.fatedice';

export function setupContextMenu() {
    OBR.contextMenu.create({
        id: `${id}/context-menu`,
        icons: [
          {
            icon: "/favicon.svg",
            label: "Roll some dice!",
            filter: {
              every: [{ key: "layer", value: "CHARACTER" }],
            },
          },
        ],
        onClick() {},
    });
}