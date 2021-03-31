import { Link } from 'react-router-dom';

export default function (error, cleanup, { history }) {
  return (
    <div className="error-container">
      <p>Error:{error.statusCode}</p>
      <p>{error.message}</p>
      <Link
        className="btn"
        to="/"
        onclick={() => {
          cleanup()
        }}>Back to Home</Link>
    </div>)
}