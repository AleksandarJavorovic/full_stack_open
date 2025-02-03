import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
};

export default Notification;