import { Form } from "@remix-run/react";

// app/routes/login.tsx
export default function Login() {
  return (
    <Form action="/auth" method="post">
      <button className="btn btn-primary">Login with Auth0</button>
    </Form>
  );
}
