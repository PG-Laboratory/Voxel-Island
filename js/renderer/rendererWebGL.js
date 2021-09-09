const RendererWebGL = function(island, canvas) {
    const sprocket = new Sprocket(canvas, false, true);
    const surfaces = [];
    const clearColor = new Sprocket.Color(
        RendererWebGL.CLEAR_COLOR.r,
        RendererWebGL.CLEAR_COLOR.g,
        RendererWebGL.CLEAR_COLOR.b);

    const clear = () => {
        for (const surface of surfaces)
            surface.free();

        surfaces.length = 0;

        sprocket.setClearColor(new Sprocket.Color(0, 0, 0, 0));
        sprocket.clear();
        sprocket.flush();
        sprocket.setClearColor(clearColor);
    };

    const make = () => {
        clear();

        for (let z = 0; z < island.getPlan().getHeight(); ++z) {
            const canvas = island.getLayers()[z];
            const context = canvas.getContext("2d");
            const data = context.getImageData(0, 0, canvas.width, canvas.height);
            // TODO: It'd be nice if sprocket.js accepts a canvas directly, or unpacks it under the hood
            surfaces.push(new sprocket.Surface(canvas.width, canvas.height, data.data, true, false));
        }
    };

    this.setIsland = newIsland => {
        island = newIsland;

        make();
    };

    this.clean = () => {
        clear();

        sprocket.free();
    };

    this.render = (angle, pitch, scale) => {
        sprocket.clear();
        sprocket.push();

        sprocket.translate(canvas.width * 0.5, canvas.height * 0.5);

        for (let z = 0; z < island.getPlan().getHeight(); ++z) {
            sprocket.push();
            sprocket.translate(0, (island.getPlan().getHeight() * 0.5 - z) * scale);
            sprocket.scale(1, pitch);
            sprocket.rotate(-angle);
            sprocket.scale(scale, scale);

            surfaces[z].draw(island.getPlan().getSize() * -0.5, island.getPlan().getSize() * -0.5);

            sprocket.pop();
        }

        sprocket.pop();
        sprocket.flush();
    };

    make();
};

RendererWebGL.CLEAR_COLOR = StyleUtils.getColor("--color-ocean"); 