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
    },
    "middlediv": {
        "marginTop": "10%",
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "middlediv-title": {
        "textAlign": "center",
        "fontFamily": "\"CircularStdBold\", sans-serif",
        "fontSize": 30
    },
    "title-thoughtview": {
        "textAlign": "center",
        "fontFamily": "\"CircularStdBold\", sans-serif",
        "fontSize": 25
    },
    "author": {
        "textAlign": "center",
        "fontFamily": "\"CircularStdBold\", sans-serif",
        "fontSize": 20
    },
    "first-part-title": {
        "color": "#E53935",
        "textShadow": "1px 0 0"
    },
    "second-part-title": {
        "color": "#0D47A1",
        "textShadow": "1px 0 0"
    },
    "id-input": {
        "fontFamily": "'CircularStdBook', sans-serif",
        "fontSize": 30
    },
    "navToId-button": {
        "backgroundColor": "#FF1744 !important",
        "borderColor": "#FF1744 !important"
    },
    "purple-button": {
        "backgroundColor": "#0D47A1 !important",
        "borderColor": "#0D47A1 !important"
    },
    "post": {
        "backgroundColor": "inherit",
        "border": "1px solid black",
        "width": "100%",
        "resize": "none",
        "height": 200
    },
    "post:focus": {
        "backgroundColor": "inherit",
        "border": "1px solid black",
        "width": "100%",
        "resize": "none",
        "height": 200
    }
});