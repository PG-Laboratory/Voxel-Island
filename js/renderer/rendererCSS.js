const RendererCSS = function (island, element) {
    let container, slices, origins;

    const makeSlice = (layer, z) => {
        layer.canvas.className = RendererCSS.CLASS_SLICE;
        layer.canvas.style.top = (island.getPlan().getHeight() * 0.5 - z) + "px";
        layer.canvas.style.transform = "scale(0)";

        return layer.canvas;
    };

    const make = () => {
        this.clean();

        container = document.createElement("div");
        container.id = RendererCSS.ID_CONTAINER;

        slices = new Array(island.getPlan().getHeight());
        origins = new Array(slices.length);

        for (let z = 0; z < island.getPlan().getHeight(); ++z) {
            container.appendChild(slices[z] = makeSlice(island.getLayers()[z], z));

            origins[z] = "translate(" + island.getLayers()[z].x + "px," + island.getLayers()[z].y + "px)";
        }

        element.appendChild(container);
    };

    this.setIsland = newIsland => {
        island = newIsland;

        make();
    };

    this.clean = () => {
        while (element.firstChild)
            element.removeChild(element.firstChild);
    };

    this.resize = () => {

    };

    this.render = (angle, pitch, scale) => {
        const originOffset = Math.round(island.getPlan().getSize() * -0.5);
        const sliceTransform = "scale(1," + pitch + ") rotate(" + angle + "rad) translate(" + originOffset + "px," + originOffset + "px)";

        container.style.transform = "translate( " + (element.clientWidth * 0.5) + "px," + (element.clientHeight * 0.5) + "px) scale(" + scale + ")";

        for (let z = 0; z < island.getPlan().getHeight(); ++z) {
            slices[z].style.transform = sliceTransform + origins[z];
        }
    };

    make();
};

RendererCSS.ID_CONTAINER = "slice-container";
RendererCSS.CLASS_SLICE = "slice";