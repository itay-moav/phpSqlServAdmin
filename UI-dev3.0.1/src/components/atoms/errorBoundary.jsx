import React from "react";
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true,error };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error('Error boundary',error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (<>
                <h2>The following error has trashed this piece.</h2>
                <pre>{this.state.error}</pre>
                <a href="/vulcan">Refresh</a>
                </>);
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;