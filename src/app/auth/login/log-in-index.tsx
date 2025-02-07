import LoginForm from "./log-in-form";

export default function LogIn() {
  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen">
      <div
        className="text-center font-bold text-2xl w-32 h-32 rounded-[50%] border flex justify-center items-center mb-5 bg-sky-300
      border-sky-400"
      >
        <span className="text-sky-900">CLICK</span>
      </div>
      <LoginForm />
    </div>
  );
}
