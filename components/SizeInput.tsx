import React, { ChangeEvent, FC } from 'react';

interface Props {
	sizes?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	oneSize?: boolean;
}

const SizeInput: FC<Props> = ({ sizes = 'S,M,L', value, onChange, oneSize = false }) => {
	return (
		<div>
			<h3>Размер</h3>
			<select value={value} onChange={onChange}>
				{oneSize ? (
					<option>One size</option>
				) : (
					sizes.split(',').map((size, i) => (
						<option value={size} key={i}>
							{size}
						</option>
					))
				)}
			</select>
		</div>
	);
};

export default SizeInput;
