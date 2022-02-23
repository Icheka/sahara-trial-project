import { getAuthToken, https, setAuthToken } from 'config';
import { api, networkError } from 'services';
import { AdminLoginPayload } from 'types';

export class AdminService {
    // login
    public static async login(payload: AdminLoginPayload) {
        return https
            .post(api.admin.login, payload)
            .then((res) => {
                setAuthToken(res.data.data.token);
                return [0, res.data.data];
            })
            .catch((err) => [1, networkError(err)]);
    }

    // whoami
    public static async whoami() {
        const token = getAuthToken();
        if (token === null) return [1, null];

        return https
            .get(api.admin.whoami)
            .then((res) => [0, res.data.data])
            .catch((err) => [1, networkError(err)]);
    }

    // fetch products
    public static async fetchProducts() {
        return https
            .get(api.admin.products.fetchAll)
            .then((res) => [0, res.data.data])
            .catch((err) => [1, networkError(err)]);
    }

    // create product
    public static async createProduct() {
        return https
            .post(api.admin.products.create)
            .then((res) => [0, res.data.data])
            .catch((err) => [1, networkError(err)]);
    }

    // fetch customers
    public static async fetchCustomers() {
        return https
            .get(api.admin.customers.fetchAll)
            .then((res) => res.data.data)
            .catch((err) => [1, networkError(err)]);
    }
}
