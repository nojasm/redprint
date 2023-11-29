var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var items = {
    name: "",
    groups: {
        "123": {
            name: "AND"
        }
    }
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
    ]
}


canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var horizontalBlocks = 70;
var verticalBlocks = Math.floor((canvas.height / canvas.width) * horizontalBlocks);

console.log(horizontalBlocks + " x " + verticalBlocks);

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
        let w = cw / horizontalBlocks;
        let h = ch / (horizontalBlocks * (ch / cw));
        let x = cw / 2 + (block.x * w);
        let y = ch / 2 + (block.y * h);
        ctx.fillRect(x, y, w, w);
    });
}

canvas.addEventListener("mousemove", (event) => {
    items.blocks.forEach((block) => {
        if (block.origX == undefined) block.origX = block.x;
        if (block.origY == undefined) block.origY = block.y;
        
        if (block.group == "567") {
            block.x = Math.floor((horizontalBlocks / 2) * ((event.clientX / canvas.width) * 2 - 1));
            block.y = Math.floor((verticalBlocks / 2) * ((event.clientY / canvas.height) * 2 - 1));
        }
    });
    render();
});

render();
