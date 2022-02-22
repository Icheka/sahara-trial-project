import { getAuthToken, https, setAuthToken } from 'config';
import { api, networkError } from 'services';
import { ActivateProductPayload } from 'types';
import { CustomerLoginPayload, CustomerSignupPayload } from 'types/accounts';

export class CustomerService {
    // activate product kit
    public static async activateProduct(payload: ActivateProductPayload) {
        return await https
            .patch(api.product.activate, payload)
            .then(() => [0])
            .catch((err) => [1, networkError(err)]);
    }

    // login
    public static async login(payload: CustomerLoginPayload) {
        return await https
            .post(api.customers.login, payload)
            .then((res) => {
                const { data } = res.data;
                setAuthToken(data.token);
                return [0, data.user];
            })
            .catch((err) => [1, networkError(err)]);
    }

    // signup
    public static async signup(payload: CustomerSignupPayload) {
        return await https
            .post(api.customers.signup, payload)
            .then(() => [0])
            .catch((err) => [1, networkError(err)]);
    }

    // whoami
    public static async whoami() {
        const token = getAuthToken();
        if (token === null) return [1, null];

        return await https
            .get(api.customers.whoami)
            .then((res) => [0, res.data.data])
            .catch((err) => [1, networkError(err)]);
    }
}
