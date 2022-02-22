import { FunctionComponent } from 'react';

import { ITextField, TextField } from './TextField';

export const EmailField: FunctionComponent<ITextField> = (props) => {
    return <TextField type={`email`} autoComplete={`email`} {...props} />;
};
