import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "height": "100%"
    },
    "body": {
        "height": "100%",
        "WebkitAnimation": "background 10s cubic-bezier(1,0,0,1) infinite",
        "animation": "background 10s cubic-bezier(1,0,0,1) infinite"
    }
});