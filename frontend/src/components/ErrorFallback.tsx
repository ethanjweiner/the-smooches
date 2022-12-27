import { Button, Card, Container } from 'react-bootstrap';
import { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container>
      <Card className="p-4 mt-5">
        <h3>Something went wrong:</h3>
        <pre>{error.message}</pre>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </Card>
    </Container>
  );
}

export default ErrorFallback;
