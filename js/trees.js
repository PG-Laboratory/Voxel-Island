const Trees = function (size, height, heightmap, scale) {
    this.plant = shapes => {
        for (let i = 0; i < 3000; ++i) {
            const x = Math.floor(Math.random() * size);
            const y = Math.floor(Math.random() * size);
            const h = heightmap.getHeight(x, y);
            const z = h * height;

            if (h < 0.1 || h > 0.4)
                continue;

            const radius = (8 + Math.random() * 4) * scale;
            const tall = radius * 2;

            shapes.add(new ShapeCone(new Vector3(x, y, z), radius, tall, Trees.COLOR_PINE));
        }
    };
};

Trees.COLOR_PINE = new Color(37 / 255, 123 / 255, 37 / 255);