import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FieldSchema {
  label: string;
  name: string;
  type: "text" | "email" | "number" | "password" | "checkbox" | "radio" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[]; 
}

const formSchema: FieldSchema[] = [
  { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your name" },
  { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
  { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
  {
    label: "Gender",
    name: "gender",
    type: "radio",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    label: "Country",
    name: "country",
    type: "select",
    options: [
      { value: "usa", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "india", label: "India" },
    ],
  },
  { label: "Subscribe to Newsletter", name: "subscribe", type: "checkbox" },
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number().min(18, "You must be at least 18").required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  subscribe: Yup.boolean(),
});

export default function DynamicFormikForm() {
  const initialValues = formSchema.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Dynamic Form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ }) => (
          <Form className="space-y-4">
            {formSchema.map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="font-medium">{field.label}</label>

                {["text", "email", "number", "password"].includes(field.type) && (
                  <Field type={field.type} name={field.name} placeholder={field.placeholder} className="border p-2 rounded" />
                )}

                {field.type === "checkbox" && (
                  <div className="flex items-center gap-2">
                    <Field type="checkbox" name={field.name} className="w-4 h-4" />
                    <span>{field.label}</span>
                  </div>
                )}

                {field.type === "radio" && field.options?.map((option) => (
                  <label key={option.value} className="flex items-center gap-2">
                    <Field type="radio" name={field.name} value={option.value} />
                    {option.label}
                  </label>
                ))}

                {field.type === "select" && (
                  <Field as="select" name={field.name} className="border p-2 rounded">
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                )}

                <ErrorMessage name={field.name} component="p" className="text-red-500 text-sm" />
              </div>
            ))}

            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
