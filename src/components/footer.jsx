function Footer() {
  return (
    <footer>
      <div className="fixed-bottom ">
        <div className="footer">
          <div className="contact-us ">
            <h3>Contact Us</h3>
            <p>
              Phone: +1-123-456-7890
              <br />
              Email: info@example.com
              <br />
              Address: 123 Street, City, Country
            </p>
          </div>
          <div className="connect-us">
            <h3>Stay Connected</h3>
            <p>
              Follow us on social media:
              <br />
              <a
                href="https://www.facebook.com/example"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <br />
              <a
                href="https://www.twitter.com/example"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <br />
              <a
                href="https://www.instagram.com/example"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <br />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
