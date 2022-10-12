import ReactDOM from "react-dom";

import "./index.css";
import "antd/dist/antd.min.css";
import { App } from "./App";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
});

ReactDOM.render(<App />, document.getElementById("root"));
