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
    "input": {
        "outline": "none",
        "border": "none",
        "display": "block",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "WebkitFontSmoothing": "antialiased",
        "fontFamily": "\"PT Sans\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif",
        "fontSize": 1,
        "color": "#555f77"
    },
    "textarea": {
        "outline": "none",
        "border": "none",
        "display": "block",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "WebkitFontSmoothing": "antialiased",
        "fontFamily": "\"PT Sans\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif",
        "fontSize": 1,
        "color": "#555f77"
    },
    "input::-webkit-input-placeholder": {
        "color": "#ced2db"
    },
    "textarea::-webkit-input-placeholder": {
        "color": "#ced2db"
    },
    "input::-moz-placeholder": {
        "color": "#ced2db"
    },
    "textarea::-moz-placeholder": {
        "color": "#ced2db"
    },
    "input:-moz-placeholder": {
        "color": "#ced2db"
    },
    "textarea:-moz-placeholder": {
        "color": "#ced2db"
    },
    "input:-ms-input-placeholder": {
        "color": "#ced2db"
    },
    "textarea:-ms-input-placeholder": {
        "color": "#ced2db"
    },
    "p": {
        "lineHeight": 1.3125
    },
    "comments": {
        "marginTop": 2.5,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "maxWidth": 60.75,
        "paddingTop": 0,
        "paddingRight": 1.25,
        "paddingBottom": 0,
        "paddingLeft": 1.25
    },
    "comment-wrap": {
        "marginBottom": 1.25,
        "display": "table",
        "width": "100%",
        "minHeight": 5.3125
    },
    "photo": {
        "paddingTop": 0.625,
        "display": "table-cell",
        "width": 3.5
    },
    "photo avatar": {
        "height": 2.25,
        "width": 2.25,
        "borderRadius": "50%",
        "backgroundSize": "contain"
    },
    "comment-block": {
        "paddingTop": 1,
        "paddingRight": 1,
        "paddingBottom": 1,
        "paddingLeft": 1,
        "backgroundColor": "#fff",
        "display": "table-cell",
        "verticalAlign": "top",
        "borderRadius": 0.1875,
        "boxShadow": "0 1px 3px 0 rgba(0, 0, 0, 0.08)"
    },
    "comment-block textarea": {
        "width": "100%",
        "resize": "none"
    },
    "comment-text": {
        "marginBottom": 1.25
    },
    "bottom-comment": {
        "color": "#acb4c2",
        "fontSize": 0.875
    },
    "comment-date": {
        "float": "left"
    },
    "comment-actions": {
        "float": "right"
    },
    "comment-actions li": {
        "display": "inline",
        "marginTop": -2,
        "marginRight": -2,
        "marginBottom": -2,
        "marginLeft": -2,
        "cursor": "pointer"
    },
    "comment-actions licomplain": {
        "paddingRight": 0.75,
        "borderRight": "1px solid #e1e5eb"
    },
    "comment-actions lireply": {
        "paddingLeft": 0.75,
        "paddingRight": 0.125
    },
    "comment-actions li:hover": {
        "color": "#0095ff"
    }
});