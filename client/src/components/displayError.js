import { Link } from 'react-router-dom';

export default function func(error, cleanUp) {
  return (
    <div className="error-container">
      <div className="header-container">
        <h1>Error:{error.statusCode}</h1>
      </div>
      <p className="p-welcome">{error.message}</p>
      <Link
        className="btn green-btn"
        to="/"
        onClick={() => {
          cleanUp()
        }}>Take me home</Link>
    </div>)
}