import PropTypes from 'prop-types';

const LoginForm = (
    {
        handleSubmit,
        handleUsernameChange,
        handlePasswordChange,
        username,
        password
    }
) => {

    return (
        <>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        type="text"
                        id="username"
                        value={username}
                        name="Username"
                        onChange={({target}) => handleUsernameChange(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        id="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => handlePasswordChange(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default LoginForm;