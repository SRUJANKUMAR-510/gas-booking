import React from 'react';

const PageNotFound = () => {
    return (
        <div className ="container-fluid pt-4 px-4">
            <div className ="row vh-90 bg-secondary rounded align-items-center justify-content-center mx-0">
                <div className ="col-md-6 text-center p-4">
                    <i className ="bi bi-exclamation-triangle display-1 text-primary"></i>
                    <h1 className ="display-1 fw-bold">404</h1>
                    <h1 className ="mb-4">Page Not Found</h1>
                    <p className ="mb-4">We’re sorry, the page you have looked for does not exist in our website!
                        Maybe go to our home page or try to use a search?</p>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;