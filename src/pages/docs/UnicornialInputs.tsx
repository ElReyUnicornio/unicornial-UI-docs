import { useState } from "react";
import {
  Button,
  Form,
  UnicornialColorPicker,
  UnicornialDatePicker,
  UnicornialFileInput,
  UnicornialImageInput,
  UnicornialInput,
  UnicornialPassword,
  UnicornialRadioGroup,
  UnicornialSelect,
  UnicornialSlider,
  UnicornialSpinner,
  UnicornialSwitch,
  UnicornialTextArea,
  Validate,
  showToast,
  useForm,
} from "unicornial-ui";
import { Block, C, Card, CodeBlock, Grid, Row, Table, Text, type DemoProps } from "./ui";

// Validators live outside the components: see "Where to define validators".
// Only regex() takes a message; the other rules have built-in messages in Spanish.
const rules = {
  email: Validate.regex(/^\S+@\S+\.\S+$/, "Use the format name@site.com"),
  password: Validate.regex(/^.{6,}$/, "Use at least 6 characters"),
  message: Validate.regex(/\S/, "Write a message"),
  country: Validate.regex(/\S/, "Choose a country"),
  date: Validate.regex(/\S/, "Choose a date"),
  terms: Validate.regex(/^true$/, "Accept the terms to continue"),
};

const initialValues = {};

function describe(value: unknown) {
  if (value instanceof File) return value.name;
  if (Array.isArray(value)) return value.map((item) => (item instanceof File ? item.name : item));
  return value;
}

/** Reads the form. It renders no fields of its own. */
function FormValues() {
  const { values } = useForm();
  const shown = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, key === "password" && value ? "••••••" : describe(value)]),
  );
  return (
    <pre tabIndex={0} aria-label="Current form values" className="overflow-x-auto rounded-md bg-hover p-3 text-xs">
      <code className="font-mono">{JSON.stringify(shown, null, 2)}</code>
    </pre>
  );
}

function LiveForm({ look }: DemoProps) {
  // a new key remounts the form, which also clears the fields that keep their own state
  const [version, setVersion] = useState(0);

  return (
    <Form
      key={version}
      initialValues={initialValues}
      onSubmit={(_values, hasErrors) =>
        hasErrors
          ? showToast("Check the highlighted fields.", "error", undefined, undefined, look)
          : showToast("The form is valid. Nothing was sent.", "success", undefined, undefined, look)
      }
    >
      <Grid>
        <Card title="Text" look={look}>
          <UnicornialInput themeVariant={look} name="email" label="Email" placeholder="you@example.com" validator={rules.email} />
          <UnicornialPassword themeVariant={look} name="password" label="Password" validator={rules.password} />
          <UnicornialTextArea themeVariant={look} name="message" label="Message" validator={rules.message} />
        </Card>
        <Card title="Pickers" look={look}>
          <UnicornialSelect
            themeVariant={look}
            name="country"
            label="Country"
            validator={rules.country}
            options={[
              { value: "mx", label: "Mexico" },
              { value: "es", label: "Spain" },
              { value: "ar", label: "Argentina" },
            ]}
          />
          <UnicornialDatePicker themeVariant={look} name="date" label="Date" validator={rules.date} />
          <UnicornialColorPicker themeVariant={look} name="color" label="Color" />
        </Card>
        <Card title="Choices and numbers" look={look}>
          <UnicornialRadioGroup
            themeVariant={look}
            name="plan"
            label="Plan"
            defaultValue="free"
            orientation="horizontal"
            options={[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
            ]}
          />
          <UnicornialSpinner themeVariant={look} name="seats" label="Seats" min={1} max={10} />
          <UnicornialSlider themeVariant={look} name="volume" label="Volume" showValue defaultValue={30} />
          <UnicornialSwitch themeVariant={look} name="terms" label="I accept the terms" validator={rules.terms} />
        </Card>
        <Card title="Files" look={look}>
          <UnicornialFileInput themeVariant={look} name="document" label="Document" />
          <UnicornialImageInput themeVariant={look} name="avatar" label="Avatar" />
        </Card>
        <Card title="Form values" description="Updates as you type" look={look}>
          <FormValues />
          <Row>
            <Button type="submit" themeVariant={look}>Submit</Button>
            <Button type="button" variant="outline" themeVariant={look} onClick={() => setVersion(version + 1)}>
              Clear form
            </Button>
          </Row>
        </Card>
      </Grid>
    </Form>
  );
}

export default function UnicornialInputs({ look }: DemoProps) {
  return (
    <>
      <Block title="How they work">
        <Text>
          A <C>Unicornial*</C> field goes inside <C>{"<Form>"}</C>. It stores its value in the
          form under <C>name</C>, runs its <C>validator</C> and shows the error message. You
          don't need state of your own. <C>name</C> is required.
        </Text>
        <CodeBlock label="basic form">{`import { Button, Form, UnicornialInput, Validate } from "unicornial-ui";

const emailRule = Validate.regex(/^\\S+@\\S+\\.\\S+$/, "Use the format name@site.com");

export function SignUp() {
  return (
    <Form
      initialValues={{}}
      onSubmit={(values, hasErrors) => {
        if (!hasErrors) save(values);
      }}
    >
      <UnicornialInput name="email" label="Email" validator={emailRule} />
      <Button type="submit">Sign up</Button>
    </Form>
  );
}`}</CodeBlock>
        <Text>
          On submit, every field with a validator shows its own error. <C>onSubmit</C> is
          called even when something fails, so always check <C>hasErrors</C>.
        </Text>
      </Block>

      <Block title="All the fields">
        <div className="@container">
          <LiveForm look={look} />
        </div>
      </Block>

      <Block title="Values">
        <Table
          label="Value stored by each field"
          head={["Field", "Stored value", "onChange receives"]}
          rows={[
            ["UnicornialInput, UnicornialPassword, UnicornialTextArea", "string", "the DOM event"],
            ["UnicornialSelect, UnicornialRadioGroup", "string", "the value"],
            ["UnicornialDatePicker", "string, YYYY-MM-DD", "the value"],
            ["UnicornialColorPicker", "string, #rrggbb", "the value"],
            ["UnicornialSpinner, UnicornialSlider", "number", "the value"],
            ["UnicornialSwitch", "boolean", "the value"],
            ["UnicornialFileInput", "File[]", "the value"],
            ["UnicornialImageInput", "File or null", "the value"],
          ]}
        />
        <Text>
          Each field takes the props of its plain version, plus <C>name</C> and{" "}
          <C>validator</C>. Set a starting value with <C>defaultValue</C> (or{" "}
          <C>defaultChecked</C> for the switch) on selects, choices, numbers and pickers.
          For text fields, use <C>initialValues</C>. Text fields wait 300 ms before validating
          while you type; change it with <C>debounce</C>.
        </Text>
      </Block>

      <Block title="Validation rules">
        <Text>Start with a rule and chain more. They run in order and stop at the first one that fails.</Text>
        <CodeBlock label="chained rules">{`const username = Validate.required().minLength(3).maxLength(20);`}</CodeBlock>
        <Table
          label="Validation rules"
          head={["Rule", "Checks or does"]}
          rows={[
            ["required()", "The value isn't empty."],
            ["email()", "Looks like an email address."],
            ["minLength(n), maxLength(n)", "Text length."],
            ["regex(pattern, message?)", "Matches the pattern. The only rule with a custom message."],
            ["onlyNumbers()", "Only digits."],
            ["min(n), max(n)", "Numeric limits."],
            ["positive(), negative(), integer()", "Kind of number."],
            ["minDate(date), maxDate(date)", "Date limits."],
            ["trim(), lowercase(), uppercase()", "Change the value."],
            ["round(), truncate(), toFixed(n)", "Change a number. The result is a string."],
          ]}
        />
        <Text>
          Built-in error messages are in Spanish. To show another message, use{" "}
          <C>regex()</C> with your own text. On a switch, <C>required()</C> passes even when
          it's off; use <C>regex(/^true$/, message)</C> instead.
        </Text>
      </Block>

      <Block title="Where to define validators">
        <Text>
          Define validators outside your components. If a component calls <C>useForm()</C> and
          also creates a validator while rendering, it re-renders forever and React reports
          “Maximum update depth exceeded”.
        </Text>
        <CodeBlock label="validator placement">{`// Good: created once
const emailRule = Validate.email();

function Fields() {
  const { values } = useForm();
  return <UnicornialInput name="email" validator={emailRule} />;
}

// Avoid in a component that calls useForm()
<UnicornialInput name="email" validator={Validate.email()} />`}</CodeBlock>
      </Block>

      <Block title="useForm()">
        <Text>Call it from a component rendered inside the form.</Text>
        <Table
          label="useForm values"
          head={["Name", "What it is"]}
          rows={[
            ["values", "The current values, by field name."],
            ["setValues", "Updates the values."],
            ["reset()", "Goes back to initialValues. File fields keep their own selection."],
            ["submitCount", "How many times the form was submitted."],
            ["isSubmitting, setIsSubmitting(boolean)", "While true, the fields are disabled. You set it."],
          ]}
        />
        <Text>
          A <C>{'<Button type="reset">'}</C> doesn't reset these fields. Call <C>reset()</C>.
        </Text>
      </Block>

      <Block title="Your own connected field">
        <Text>
          <C>useFormField(name, validator, fallback)</C> connects any control to the form.
        </Text>
        <CodeBlock label="useFormField">{`const required = Validate.required();

function RatingField({ name }: { name: string }) {
  const field = useFormField<number>(name, required, 0);

  return (
    <div>
      <input
        type="range"
        min={0}
        max={5}
        aria-label="Rating"
        {...field.errorProps}
        value={field.value}
        onChange={(event) => field.onChange(Number(event.target.value))}
      />
      <FieldError id={field.errorId} message={field.message} />
    </div>
  );
}`}</CodeBlock>
      </Block>
    </>
  );
}
