const RendererWebGL = function (island, canvas) {
    const sprocket = new Sprocket(canvas, false, true);
    const surfaces = [];

    const clear = () => {
        for (const surface of surfaces)
            surface.free();

        surfaces.length = 0;

        sprocket.clear();
        sprocket.flush();
    };

    const make = () => {
        clear();

        for (let z = 0; z < island.getLayers().length; ++z) {
            const layer = island.getLayers()[z];
            const context = layer.canvas.getContext("2d");
            const data = context.getImageData(0, 0, layer.canvas.width, layer.canvas.height);

            surfaces.push(new myr.Surface(layer.canvas.width, layer.canvas.height, data.data, true, false));
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

    this.resize = (width, height) => {
        sprocket.resize(width, height);
    };


    this.render = (angle, pitch, scale) => {
        sprocket.clear();
        sprocket.bind();
        sprocket.push();

        sprocket.translate(sprocket.getWidth() * 0.5, sprocket.getHeight() * 0.5);

        for (let z = 0; z < island.getLayers().length; ++z) {
            const layer = island.getLayers()[z];

            sprocket.push();
            sprocket.translate(0, (island.getPlan().getHeight() * 0.5 - z) * scale);
            sprocket.scale(1, pitch);
            sprocket.rotate(-angle);
            sprocket.scale(scale, scale);

            surfaces[z].draw(
                island.getPlan().getSize() * -0.5 + layer.x,
                island.getPlan().getSize() * -0.5 + layer.y);

            sprocket.pop();
        }

        sprocket.pop();
        sprocket.flush();
    };

    sprocket.setClearColor(new Myr.Color(0, 0, 0, 0));

    make();
}; 