import { Link } from 'react-router-dom';

export default function func(error, cleanUp) {
  return (
    <div className="error-container">
      <p>Error:{error.statusCode}</p>
      <p>{error.message}</p>
      <Link
        className="btn"
        to="/"
        onClick={() => {
          cleanUp()
        }}>Back to Home</Link>
    </div>)
}