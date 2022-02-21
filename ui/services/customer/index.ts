import { https, setAuthToken } from 'config';
import { api, networkError } from 'services';
import { CustomerLoginPayload } from 'types/accounts';

export class CustomerService {
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
}
