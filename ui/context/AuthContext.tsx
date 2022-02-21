import React, { createContext, useEffect, useState } from 'react';
import { IAuthContext } from 'types';
import { DraftFunction, useImmer } from 'use-immer';

export const AuthContext = createContext<IAuthContext>({
    updateContext: (cx: IAuthContext) => {},
});

export const AuthContextProvider = (props: Record<string, any>) => {
    // vars

    // utils
    const loadFromLocalStorage = (): null | IAuthContext => {
        if (localStorage === undefined) return null;

        const cache = localStorage.getItem('AuthContext');
        if (cache === null) return null;
        return JSON.parse(cache);
    };
    const updateLocalStorage = (cache?: IAuthContext): void => {
        console.log('updateLocalStorage::', cache, JSON.stringify(cache));
        localStorage?.setItem(
            'AuthContext',
            cache ? JSON.stringify(cache) : JSON.stringify(state)
        );
    };
    const updateContext = (cx: IAuthContext): void => {
        setState(cx);
    };
    const updateContextWithDraft = (draft: IAuthContext | DraftFunction<IAuthContext>) => {
        setState(draft);
    };
    const syncUserDown = async () => {
        // const [status, data] = await EscortProfileService.whoAmI();
        // if (status === 0) {
        //     updateContext({ ...state, user: data });
        //     return true;
        // }
        // return false;
    };

    // vars
    const methods = {
        updateContext,
        updateContextWithDraft,
        syncUserDown,
    };

    // state
    const [state, setState] = useImmer<IAuthContext>(methods);
    const [counter, setCounter] = useState(0);

    // hooks
    // on component mount, load cache from localStorage if it exists
    useEffect(() => {
        console.log('getting cache from ls');
        let cache = loadFromLocalStorage();
        console.log('called cache, got', cache);

        if (cache === null || Object.keys(cache).length === 0) {
            console.log('cache was null');
            cache = {
                ...methods,
            };
        } else {
            cache = { ...cache, ...methods };
        }
        setState(cache);
        setCounter(counter + 1);
    }, []);
    // whenever internal state is mutated, cache a copy to localStorage
    useEffect(() => {
        if (counter === 0) return;
        console.log('updating ls', state);
        updateLocalStorage(state);
    }, [JSON.stringify(state)]);

    return (
        <AuthContext.Provider value={{ ...state }}>{props.children}</AuthContext.Provider>
    );
};
