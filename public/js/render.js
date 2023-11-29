var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var structures = [
    {
        name: "8-Bit Adder",
        guid: "7845b6098sen597845b6098sen590se7nt908se74589120se7nt908se7458912",
        sizeX: 25,
        sizeY: 7,
        sizeZ: 3,
        blocks: [
            {
                x: 0,
                y: 0,
                z: 0,
                id: "redstone_lamp",
                isInput: true,
                isOutput: false
            }
        ]
    }
]

var items = {
    name: "",
    groups: {
        "123": {
            name: "AND"
        }
    },
    blocks: [
        {
            x: 0,
            y: 0,
            z: 0,
            id: "redstone_wire",
            group: "123"  // Group ID
        },
        {
            x: 50,
            y: 0,
            z: 0,
            id: "redstone_wire",
            group: "567"  // Group ID
        },
        {
            x: 1,
            y: 1,
            z: 0,
            id: "redstone_wire",
            group: "123"  // Group ID
        },
        {
            x: 3,
            y: 3,
            z: 0,
            id: "redstone_wire",
            group: "123"  // Group ID
        }
    ],
    structures: [
        {
            guid: "7845b6098sen597845b6098sen590se7nt908se74589120se7nt908se7458912",
            x: 5,
            y: 0,
            z: 0
        }
    ]
}


canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var isDragging = false;
var draggingOriginX = 0;
var draggingOriginY = 0;

var canvasCameraX = 0;
var canvasCameraY = 0;

var horizontalBlocks = 70;
var verticalBlocks = Math.floor((canvas.height / canvas.width) * horizontalBlocks);

console.log(horizontalBlocks + " x " + verticalBlocks);

function renderBlock(block) {
    let cw = canvas.width;
    let ch = canvas.height;

    let w = cw / horizontalBlocks;
    let h = ch / (horizontalBlocks * (ch / cw));
    let x = cw / 2 + (block.x * w);
    let y = ch / 2 + (block.y * h);

    if (block.id == "redstone")
        ctx.fillStyle = "red";
    else
        ctx.fillStyle = "#223";

    ctx.fillRect(x - canvasCameraX, y - canvasCameraY, w, w);
}

function fillArea(x1, y1, x2, y2) {
    /*let cw = canvas.width;
    let ch = canvas.height;

    let w = cw / horizontalBlocks;
    let h = ch / (horizontalBlocks * (ch / cw));
    let x = cw / 2 + (block.x * w);
    let y = ch / 2 + (block.y * h);

    if (block.id == "redstone")
        ctx.fillStyle = "red";
    else
        ctx.fillStyle = "#223";

    ctx.fillRect(x - canvasCameraX, y - canvasCameraY, w, w);*/
}

function render() {
    let currentZ = 0;
    let camX = 0;
    let camY = 0;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let cw = canvas.width;
    let ch = canvas.height;
    
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#222";

    items.blocks.forEach((block) => {
        renderBlock(block);
    });

    items.structures.forEach((structure) => {
        // Find blocks from structure GUID
        structures.forEach((s) => {
            if (s.guid == structure.guid) {
                fillArea(structure.x, structure.y, structure.x);

                s.blocks.forEach((_block) => {
                    block = structuredClone(_block);

                    block.x += structure.x;
                    block.y += structure.y;
                    block.z += structure.z;
                    block.id = "redstone";
                    renderBlock(block);
                });
                return;
            }
        });
    });
}

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        canvasCameraX = draggingOriginX - event.clientX;
        canvasCameraY = draggingOriginY - event.clientY;
    } else {
        items.blocks.forEach((block) => {
            if (block.origX == undefined) block.origX = block.x;
            if (block.origY == undefined) block.origY = block.y;
            
            if (block.group == "567") {
                block.x = Math.floor((horizontalBlocks / 2) * (((event.clientX + canvasCameraX) / canvas.width) * 2 - 1));
                block.y = Math.floor((verticalBlocks / 2) * (((event.clientY + canvasCameraY) / canvas.height) * 2 - 1));
            }
        });
    }

    render();
});

canvas.addEventListener("wheel", (event) => {
    event.preventDefault();

    horizontalBlocks += Math.floor(event.deltaY / 30);
    if (horizontalBlocks < 10) horizontalBlocks = 10;
    else if (horizontalBlocks > 150) horizontalBlocks = 150;

    verticalBlocks = Math.floor((canvas.height / canvas.width) * horizontalBlocks);
    render();
});

canvas.addEventListener("mousedown", (event) => {
    if (event.button == 0) {

    } else if (event.button == 2) {

    } else if (event.button == 1) {
        isDragging = true;
        draggingOriginX = canvasCameraX + event.clientX;
        draggingOriginY = canvasCameraY + event.clientY;
    }
});

canvas.addEventListener("mouseup", (event) => {
    if (isDragging) {
        isDragging = false;
    }

    render();
});

render();
