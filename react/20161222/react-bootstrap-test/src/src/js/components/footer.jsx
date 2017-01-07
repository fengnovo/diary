import React from 'react';

const Footer = (props) => {
    return (
        <footer className="footer">
            <p>&copy;广发证券股份有限公司版权所有1991-{(new Date()).getFullYear()}</p>            
        </footer>
    );
};

export default Footer;