import React from 'react';

interface LoginTemplateProps {
  formData: {
    login: string;
    password: string;
  };
  error: string;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="status"
    aria-label="Loading"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const ErrorAlert: React.FC<{ message: string }> = ({ message }) => (
  <div
    role="alert"
    className="mb-4 flex items-center rounded-md bg-red-50 border border-red-400 px-4 py-3 text-sm text-red-800 shadow-sm"
  >
    <svg
      className="mr-3 h-5 w-5 flex-shrink-0 text-red-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p>{message}</p>
  </div>
);


export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  formData,
  error,
  isSubmitting,
  onInputChange,
  onSubmit,
}) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-lime-500 to-lime-600">
      <section className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl h-[600px] flex">
        <div className="w-2/5 bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center relative">
          <img
            src="../../public/login-img.jpg"
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-3/5 p-8 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6 text-left text-gray-800">
              Bem-Vindo!
            </h1>

            {error && <ErrorAlert message={error} />}

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="login"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Login
                </label>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={formData.login}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="Digite seu login"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="Digite sua senha"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm text-lime-600 hover:text-lime-500"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
