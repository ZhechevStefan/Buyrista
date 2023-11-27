const Footer = props => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>Buyrista &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
