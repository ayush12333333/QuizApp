import React from "react";

const LoginForm = ({ title, formData, setFormData, handleSubmit, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">{title}</h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="border p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 w-full rounded-lg font-semibold hover:bg-blue-700 transition transform hover:-translate-y-1"
        >
          {title}
        </button>

        {/* Children for extra links */}
        {children && <div className="mt-4">{children}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
