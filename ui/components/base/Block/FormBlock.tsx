import { FunctionComponent } from 'react';
import { FormSectionHeader } from './SectionHeader';

export const FormBlock: FunctionComponent<{
    target: number;
    step: number;
    label?: string;
}> = ({ children, target, step, label }) => (
    <div className={`${step !== target && 'opacity-0 w-0 h-0 overflow-hidden absolute'}`}>
        {label && <FormSectionHeader text={label} />}
        {children}
    </div>
);
