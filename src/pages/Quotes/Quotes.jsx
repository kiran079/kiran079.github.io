import React from 'react';
import { Container, Typography } from '@mui/material';
import { QUOTES_LIST } from './quotesList';

function Quotes() {
	const getQuoteComponent = (quote) => (
		<Typography
			variant="h6"
			color="textPrimary"
			align="center"
			fontFamily={'Tangerine'}
			fontSize={42}
			marginTop={5}
		>
			“{quote}”
		</Typography>
	);

	const getQuotes = (quotesList) =>
		quotesList.map((quote) => getQuoteComponent(quote));

	return <Container>{getQuotes(QUOTES_LIST)}</Container>;
}

export default Quotes;
