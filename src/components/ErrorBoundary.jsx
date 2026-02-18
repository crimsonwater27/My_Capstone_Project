import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 className="text-center py-10 text-red-500">
          Something went wrong.
        </h2>
      );
    }

    return this.props.children;
  }
}

