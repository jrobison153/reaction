/**
 * Created by jrobison on 4/25/2015.
 */

"use strict";

var React = require("react");
var Header = require("./Header.jsx");
var Footer = require("./Footer.jsx");
var LeftRail = require("./LeftRail.jsx");
var RightRail = require("./RightRail.jsx");
var MainForm = require("./MainForm.jsx");

var App = React.createClass({

    render: function () {
        return <div className="application"><Header/><LeftRail/><MainForm/><RightRail/><Footer/></div>;
    }
});

React.render(<App/>, document.getElementById("root"));