import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: Error) {
    console.error('Application ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F0] p-6 text-[#303E50]">
          <div className="surface-card max-w-md rounded-[26px] p-8 text-center">
            <h1 className="font-editorial text-2xl font-medium">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#4E5E72]">
              A temporary error occurred while loading the portfolio data. You can safely reload the page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#303E50] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#303E50]/90"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
