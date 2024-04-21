// eslint-disable-next-line react/prop-types
const Display = ({ children, when }) => {
  return when ? children : null;
};
export default Display;
