import React, { ErrorInfo } from "react";

type ErrorBoundaryState = {
  error: Error | null;
};
export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong. Error: {this.state.error.message}</h1>;
    }

    return this.props.children;
  }
}
