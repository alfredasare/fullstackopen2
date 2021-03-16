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
                        value={username}
                        name="Username"
                        onChange={({target}) => handleUsernameChange(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => handlePasswordChange(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    );
};

export default LoginForm;