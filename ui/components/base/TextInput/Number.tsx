import { FunctionComponent } from 'react';

import { ITextField, TextField } from './TextField';

export const NumberField: FunctionComponent<ITextField> = (props) => {
    return <TextField type={`number`} {...props} />;
};
