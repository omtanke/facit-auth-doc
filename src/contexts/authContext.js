import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const value = useMemo(
		() => ({
			user,
			setUser,
		}),
		[user],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
