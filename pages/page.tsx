import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

interface Field {
  name: string;
}

export default function DynamicFormikForm() {
  const [fields, setFields] = useState<Field[]>([{ name: "" }]);

  const formik:any = useFormik<{ fields: Field[] }>({
    initialValues: { fields },
    validationSchema: Yup.object({
      fields: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("Submitted Data:", values);
    },
  });

  const addField = () => {
    setFields([...fields, { name: "" }]);
    formik.setValues({ fields: [...formik.values.fields, { name: "" }] });
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
    formik.setValues({ fields: newFields });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Formik Dynamic Form (TypeScript)</h2>
      {formik.values.fields.map((field:any, index:any) => (
        <div key={index} className="flex gap-2 mb-3">
          <input
            type="text"
            name={`fields.${index}.name`}
            value={field.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border p-2 rounded w-full"
            placeholder="Enter value"
          />
          {formik.touched.fields?.[index]?.name && formik.errors.fields?.[index]?.name && (
            <div className="text-red-500 text-sm">{formik.errors.fields[index].name}</div>
          )}
          <button
            type="button"
            onClick={() => removeField(index)}
            className="px-2 bg-red-500 text-white rounded"
            disabled={fields.length === 1}
          >
            ✖
          </button>
        </div>
      ))}
      <button type="button" onClick={addField} className="p-2 bg-blue-500 text-white rounded">
        ➕ Add Field
      </button>
      <button type="submit" className="ml-2 p-2 bg-green-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
