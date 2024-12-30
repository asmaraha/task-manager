import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-white py-3 mt-5">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Task Manager. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
