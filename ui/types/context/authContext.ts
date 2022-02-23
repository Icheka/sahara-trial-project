import { AdminType, CustomerType } from 'types/accounts';
import { DraftFunction } from 'use-immer';

export interface IAuthContext {
    user?: CustomerType | AdminType;
    accountType?: 'customer' | 'admin';
    updateContext: (context: IAuthContext) => void;
    updateContextWithDraft?: (draft: IAuthContext | DraftFunction<IAuthContext>) => void;
    syncUserDown?: () => void;
}
