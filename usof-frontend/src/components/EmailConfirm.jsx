import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes.js';

export default function EmailConfirm() {
    const [isFailed, setFailed] = useState(false);
    const [validToken, setValidToken] = useState(false);
    const { token } = useParams();
    const accessToken = token.split('~').join('.');
    useEffect(() => {
        const validToken = async () => {
            try {
                await axios.get(routes.confirmEmail(accessToken));
                setFailed(false);
            } catch (err) {
                if (err.response.data.message === 'Already') {
                    setValidToken(true);
                    setFailed(true);
                } else {
                    setFailed(true);
                }
            }
        };
        validToken();
    }, []);
    return (
        <div className="divFormBlock">
            <div className="Main_Form">
                <h1>
                    {validToken ? 'Invalid token' : isFailed ? 'The mail has already been confirmed' : 'Сonfirmed'}
                </h1>
                <div>
                    <div>
                        <div>
                            <p>
                            {validToken
                                ? 'The token has expired, please register again'
                                : isFailed
                                ? 'Looks like you have already confirmed your email, so you can use page'
                                : `Thank you for registering on our site!`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
};