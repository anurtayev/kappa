import ReactDOM from "react-dom";

import "./index.css";
import { App } from "./App";
import AWS from "aws-sdk";

const AWS_REGION = "us-east-1";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
});

ReactDOM.render(<App />, document.getElementById("root"));
