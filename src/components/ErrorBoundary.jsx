import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);

    // Check if it's a worker-related error
    const isWorkerError =
      error?.message?.includes('importScripts') ||
      error?.message?.includes('Worker') ||
      error?.message?.includes('blob');

    if (isWorkerError) {
      console.warn('Worker blob URL error detected - falling back to basic scroll');
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a worker error - if so, still render the app
      const isWorkerError = this.state.error?.message?.includes('importScripts');

      if (isWorkerError) {
        // Don't show error UI for worker errors - just render children
        return this.props.children;
      }

      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '20px',
          }}
        >
          <h1>Application Error</h1>
          <p style={{ color: '#666', maxWidth: '500px' }}>
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#2e5bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
