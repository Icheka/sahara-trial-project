import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import { toast } from 'react-toastify';
import capitalize from 'capitalize';

import { Page } from 'components/layout';
import { customerAuthForms } from 'const';
import { AuthContext } from 'context';
import { CustomerService } from 'services';
import {
    ButtonSubmit,
    NumberField,
    Select,
    TextField,
    TextFieldLabelText,
    TextFieldError,
} from 'components/base';
import { routes } from 'config';
import { Checkbox } from 'components/base';
import { CustomerSignupPayload, Gender, SubjectiveAnswers } from 'types/accounts';
import { DateUtil } from 'lib/utils/date';
import { useRouter } from 'next/router';
import { FormSectionHeader } from 'components/base/Block/SectionHeader';
import { InputField } from 'components/base/TextInput/InputField';

const SignUpPage: NextPage = () => {
    return (
        <Page noScroll>
            <div className={`h-screen bg-gray-50`}>
                <View />
            </div>
        </Page>
    );
};

const View: FunctionComponent = () => {
    // vars
    const authContext = useContext(AuthContext);
    const initialValues: CustomerSignupPayload = {
        firstName: '',
        lastName: '',
        country: '',
        dob: 0,
        email: '',
        ethnicity: '',
        familyHistory: {},
        gender: Gender.male,
        height: 0,
        password: '',
        weight: 0,
    };
    const finalStep = 4;
    let formikConstant: FormikProps<CustomerSignupPayload>;
    const router = useRouter();

    // state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [date, setDate] = useState(new Date());

    // utils
    const shouldSubmit = () => step === finalStep;
    const handleSubmit: (
        values: CustomerSignupPayload,
        formikHelpers: FormikHelpers<CustomerSignupPayload>
    ) => void | Promise<any> = async (values, { setSubmitting }) => {
        setIsSubmitting(true);

        if (step < finalStep) return setIsSubmitting(false);

        const [status, data] = await CustomerService.signup(values);
        if (status !== 0) {
            setSubmitting(false);
            setIsSubmitting(false);
            return toast.error(data);
        }

        toast(
            <div>
                <h2 className={`font-bold text-indigo-400`}>Welcome!</h2>
                <p className={``}>
                    Your account has been created succeasfully! You can access your new
                    account using the credentials you registered with
                </p>
            </div>
        );
        setTimeout(() => {
            router.push(routes.public.signin);
        }, 4000);

        setSubmitting(false);
        setIsSubmitting(false);
    };
    const handleDateFieldChange = (value: string, type: 'day' | 'month' | 'year') => {
        if (value.trim().length === 0) return formikConstant.setFieldValue('dob', 0);

        const newDate = DateUtil.marshallDateOfBirth({
            date,
            value,
            type,
        });
        if (newDate !== null) {
            setDate(newDate);
            formikConstant.setFieldValue('dob', DateUtil.dateToNumber(newDate));
        }
    };
    const blockValidation = (block: number): boolean => {
        const f = formikConstant;
        f.submitForm();
        let errors;

        switch (block) {
            case 1:
                errors =
                    f.errors['firstName'] ||
                    f.errors['lastName'] ||
                    f.errors['email'] ||
                    f.errors['password'] ||
                    f.errors['country'];
                break;
            case 2:
                errors =
                    f.errors['height'] ||
                    f.errors['weight'] ||
                    f.errors['gender'] ||
                    f.errors['ethnicity'] ||
                    f.errors['dob'];
                break;
            // familyHistory question are optional,
            // so there's no need to validate here
            case 3:
            case 4:
                break;

            default:
                // setting errors to true because we'll be returning !!!errors
                errors = true;
        }
        f.setErrors({});
        return !!!errors;
    };

    // jsx
    const SubmitButton: FunctionComponent = () => {
        // vars
        const submit = step === finalStep - 1;

        // utils
        const shouldNext = () => {
            return !submit ? blockValidation(step) : true;
        };
        const handleClick = () => {
            if (!shouldNext()) return;

            if (step < finalStep) setStep(step + 1);
        };

        return (
            <div>
                <button
                    type={'button'}
                    className="w-full flex justify-center items-center h-10 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isSubmitting}
                    onClick={handleClick}
                >
                    {isSubmitting ? <ButtonSubmit /> : step < finalStep ? 'Next' : 'Finish'}
                </button>
            </div>
        );
    };
    const Block: FunctionComponent<{ target: number }> = ({ children, target }) => (
        <div
            className={`${step !== target && 'opacity-0 w-0 h-0 overflow-hidden absolute'}`}
        >
            {children}
        </div>
    );
    const BackButton: FunctionComponent = () =>
        shouldSubmit() || step === 1 ? null : (
            <div className={`relative -top-4`}>
                <button
                    type={'button'}
                    className="w-full flex justify-center items-center h-10 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    disabled={isSubmitting}
                    onClick={() => setStep(step - 1)}
                >
                    Back
                </button>
            </div>
        );

    // hooks
    useEffect(() => {
        // validate form on page load to trigger block validations before the Next button is clicked
        if (step === 1) blockValidation(step);
    }, []);

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
                        Sign up!
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href={routes.public.signin}>
                            <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                sign in to your account
                            </a>
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={customerAuthForms.validations.signUp}
                            onSubmit={handleSubmit}
                        >
                            {(formik) => {
                                formikConstant = formik;
                                return (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            formik.handleSubmit(e);
                                        }}
                                        className="space-y-6"
                                        action="#"
                                        method="POST"
                                    >
                                        <Block target={1}>
                                            <InputField
                                                label={`First Name`}
                                                title={`firstName`}
                                                formik={formik}
                                            />
                                            <InputField
                                                label={`Last Name`}
                                                title={`lastName`}
                                                formik={formik}
                                            />
                                            <InputField
                                                label={`Email address`}
                                                title={`email`}
                                                formik={formik}
                                                autoComplete={`email`}
                                                type={`email`}
                                            />
                                            <InputField
                                                label={`Password`}
                                                title={`password`}
                                                formik={formik}
                                                autoComplete={`current-password`}
                                                type={`password`}
                                            />
                                            <InputField
                                                label={`Country of descent`}
                                                title={`country`}
                                                formik={formik}
                                                placeholder={`e.g Nigeria`}
                                            />

                                            <div className="flex items-center justify-between mt-3">
                                                <Checkbox label="I agree to the SaharaTx Terms &amp; Conditions" />
                                            </div>
                                        </Block>

                                        <Block target={2}>
                                            <div className={`mt-1`}>
                                                <Select
                                                    items={Object.values(Gender).map(
                                                        (v) => ({
                                                            value: v,
                                                            label: (
                                                                <span
                                                                    className={`capitalize`}
                                                                >
                                                                    {v}
                                                                </span>
                                                            ),
                                                        })
                                                    )}
                                                    onSelect={(selected) =>
                                                        formik.setFieldValue(
                                                            'gender',
                                                            Object.values(Gender)[selected]
                                                        )
                                                    }
                                                    label={`Gender`}
                                                />
                                            </div>
                                            <InputField label={`Date of birth`}>
                                                <div className={`flex gap-4`}>
                                                    <NumberField
                                                        className={`w-20`}
                                                        min={1}
                                                        max={31}
                                                        onChange={(e) =>
                                                            handleDateFieldChange(
                                                                e.currentTarget.value,
                                                                'day'
                                                            )
                                                        }
                                                        label={'Day'}
                                                        placeholder={'Day'}
                                                    />
                                                    <NumberField
                                                        className={`w-20`}
                                                        min={1}
                                                        max={12}
                                                        onChange={(e) =>
                                                            handleDateFieldChange(
                                                                e.currentTarget.value,
                                                                'month'
                                                            )
                                                        }
                                                        label={'Month'}
                                                        placeholder={'Month'}
                                                    />
                                                    <NumberField
                                                        className={`w-20`}
                                                        min={1970}
                                                        max={new Date().getFullYear()}
                                                        onChange={(e) =>
                                                            handleDateFieldChange(
                                                                e.currentTarget.value,
                                                                'year'
                                                            )
                                                        }
                                                        label={'Year'}
                                                        placeholder={'Year'}
                                                    />
                                                </div>
                                                <div>
                                                    <TextFieldError>
                                                        {formik.errors['dob']}
                                                    </TextFieldError>
                                                </div>
                                            </InputField>

                                            <InputField
                                                label={`Ethnicity`}
                                                title={`ethnicity`}
                                                formik={formik}
                                                placeholder={`e.g Yoruba`}
                                            />
                                            <InputField
                                                label={`Height (in centimetres)`}
                                                title={`height`}
                                                formik={formik}
                                                type={`number`}
                                            />
                                            <InputField
                                                label={`Weight (in kilogrammes)`}
                                                title={`weight`}
                                                formik={formik}
                                                type={`number`}
                                            />
                                        </Block>

                                        <Block target={3}>
                                            <FamilyHistorySectionHeader index={1} />
                                            <FamilyHistoryQuestion>
                                                <InputField
                                                    label={`Have you or a family member ever been diagnosed with a cardiovascular disease? E.g heart attack, stroke`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((v) => ({
                                                            value: v,
                                                            label: capitalize(v),
                                                        }))}
                                                        onSelect={(index: number) =>
                                                            formik.setFieldValue(
                                                                'familyHistory.cardiovascular',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[index]
                                                            )
                                                        }
                                                    />
                                                </InputField>
                                            </FamilyHistoryQuestion>
                                            <FamilyHistoryQuestion>
                                                <InputField
                                                    label={`Have you or a family member ever been diagnosed with colo-rectal cancer or a cancer of the colon?`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((v) => ({
                                                            value: v,
                                                            label: capitalize(v),
                                                        }))}
                                                        onSelect={(index: number) =>
                                                            formik.setFieldValue(
                                                                'familyHistory.colorectalCancer',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[index]
                                                            )
                                                        }
                                                    />
                                                </InputField>
                                            </FamilyHistoryQuestion>
                                            <FamilyHistoryQuestion>
                                                <InputField
                                                    label={`Have you or a family member ever been diagnosed with gastro-oesophageal reflux disease (GERD)?`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((v) => ({
                                                            value: v,
                                                            label: capitalize(v),
                                                        }))}
                                                        onSelect={(index: number) =>
                                                            formik.setFieldValue(
                                                                'familyHistory.gerd',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[index]
                                                            )
                                                        }
                                                    />
                                                </InputField>
                                            </FamilyHistoryQuestion>
                                        </Block>
                                        <Block target={4}>
                                            <FamilyHistorySectionHeader index={2} />
                                            <FamilyHistoryQuestion>
                                                <InputField
                                                    label={`Have you or a family member ever been diagnosed with inflammatory bowel disease (IBD)?`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((v) => ({
                                                            value: v,
                                                            label: capitalize(v),
                                                        }))}
                                                        onSelect={(index: number) =>
                                                            formik.setFieldValue(
                                                                'familyHistory.ibd',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[index]
                                                            )
                                                        }
                                                    />
                                                </InputField>
                                            </FamilyHistoryQuestion>
                                            <FamilyHistoryQuestion>
                                                <InputField
                                                    label={`Have you or a family member ever been diagnosed with either Non-alcoholic Steatohepatitis (NASH) or Non-alcoholic Fatty Liver (NAFL) disease? E.g heart attack, stroke`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((v) => ({
                                                            value: v,
                                                            label: capitalize(v),
                                                        }))}
                                                        onSelect={(index: number) =>
                                                            formik.setFieldValue(
                                                                'familyHistory.nash',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[index]
                                                            )
                                                        }
                                                    />
                                                </InputField>
                                            </FamilyHistoryQuestion>
                                            <FamilyHistoryQuestion>
                                                <InputField
                                                    label={`Have you or a family member ever been diagnosed with type 2 diabetes mellitus?`}
                                                >
                                                    <Select
                                                        items={Object.values(
                                                            SubjectiveAnswers
                                                        ).map((v) => ({
                                                            value: v,
                                                            label: capitalize(v),
                                                        }))}
                                                        onSelect={(index: number) =>
                                                            formik.setFieldValue(
                                                                'familyHistory.t2dm',
                                                                Object.values(
                                                                    SubjectiveAnswers
                                                                )[index]
                                                            )
                                                        }
                                                    />
                                                </InputField>
                                            </FamilyHistoryQuestion>
                                        </Block>

                                        <SubmitButton />
                                        <BackButton />
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

const FamilyHistorySectionHeader: FunctionComponent<{ index: number }> = ({ index }) => (
    <SectionHeader text={`Family History (${index}/2)`} />
);

const SectionHeader = FormSectionHeader;

const FamilyHistoryQuestion: FunctionComponent = ({ children }) => (
    <div className={`mt-3`}>{children}</div>
);

export default SignUpPage;
