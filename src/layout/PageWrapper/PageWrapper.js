import React, { useLayoutEffect, forwardRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { demoPages } from '../../menu';

const PageWrapper = forwardRef(({ isProtected, title, description, className, children }, ref) => {
	useLayoutEffect(() => {
		document.getElementsByTagName('TITLE')[0].text = `${title ? `${title} | ` : ''}${
			process.env.REACT_APP_SITE_NAME
		}`;
		document
			.querySelector('meta[name="description"]')
			.setAttribute('content', description || process.env.REACT_APP_META_DESC);
	});

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();
	useEffect(() => {
		if (isProtected && !user) {
			navigate(`../${demoPages.login.path}`);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
			{children}
		</div>
	);
});
PageWrapper.propTypes = {
	isProtected: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
PageWrapper.defaultProps = {
	isProtected: true,
	title: null,
	description: null,
	className: null,
};

export default PageWrapper;
