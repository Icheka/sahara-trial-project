import { FunctionComponent, useContext, useState } from 'react';

import { NextPage } from 'next';

import { Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { Page } from 'components/layout';
import { adminAuthForms } from 'const';
import { AuthContext } from 'context';
import { AdminService, CustomerService } from 'services';
import { ButtonSubmit } from 'components/base';
import { PasswordField } from 'components/base/TextInput/Password';
import { EmailField } from 'components/base/TextInput/Email';
import { routes } from 'config';
import { useRouter } from 'next/router';

const AdminAuthPage: NextPage = () => {
    return (
        <Page>
            <div className={`h-screen bg-gray-50`}>
                <View />
            </div>
        </Page>
    );
};

const View: FunctionComponent = () => {
    // vars
    const authContext = useContext(AuthContext);
    const router = useRouter();

    // state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // utils
    const handleSubmit: (
        values: {
            email: string;
            password: string;
        },
        formikHelpers: FormikHelpers<{
            email: string;
            password: string;
        }>
    ) => void | Promise<any> = async (values, { setSubmitting }) => {
        setIsSubmitting(true);
        setSubmitting(true);

        const [status, data] = await AdminService.login(values);

        setSubmitting(false);
        setIsSubmitting(false);

        if (status !== 0) return toast.error(data);

        authContext.updateContext({
            ...authContext,
            accountType: 'admin',
            user: data.user,
        });
        toast(`You have successfully logged in!`);

        const url = new URL(window.location.href);
        const redirectTo = url.searchParams.get('redirect-to');

        const redirectPath = redirectTo ?? routes.admin.index;
        router.push(redirectPath);
    };

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={adminAuthForms.signin.validations}
                            onSubmit={handleSubmit}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit} className="space-y-6">
                                    <div>
                                        <div className="mt-1">
                                            <EmailField
                                                label="Email address"
                                                required
                                                additionalInputProps={formik.getFieldProps(
                                                    'email'
                                                )}
                                                error={
                                                    formik.errors['email'] &&
                                                    formik.touched['email'] &&
                                                    formik.errors['email']
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mt-1">
                                            <PasswordField
                                                label="Password"
                                                required
                                                additionalInputProps={formik.getFieldProps(
                                                    'password'
                                                )}
                                                error={
                                                    formik.errors['password'] &&
                                                    formik.touched['password'] &&
                                                    formik.errors['password']
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center items-center h-10 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <ButtonSubmit /> : 'Sign in'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAuthPage;
