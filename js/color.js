const Color = function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
};

Color.prototype.toHex = function () {
    const componentToHex = component => {
        let hex = component.toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" +
        componentToHex(Math.floor(this.r * 256)) +
        componentToHex(Math.floor(this.g * 256)) +
        componentToHex(Math.floor(this.b * 256));
};

Color.fromHex = hex => {
    const integer = parseInt(hex, 16);

    return new Color(
        ((integer >> 16) & 0xFF) / 255,
        ((integer >> 8) & 0xFF) / 255,
        (integer & 0xFF) / 255);
};