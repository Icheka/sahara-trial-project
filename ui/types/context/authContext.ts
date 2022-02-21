import { CustomerType } from 'types/accounts';
import { DraftFunction } from 'use-immer';

export interface IAuthContext {
    user?: CustomerType;
    accountType?: 'customer';
    updateContext: (context: IAuthContext) => void;
    updateContextWithDraft?: (draft: IAuthContext | DraftFunction<IAuthContext>) => void;
    syncUserDown?: () => void;
}
