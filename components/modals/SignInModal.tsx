import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const SignInModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!email || !password) {
        toast.error("Please enter both email and password.");
        return;
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        if (signInResult.error === "No such user found") {
          toast.error("User not found. Please register.");
          loginModal.onClose();
          registerModal.onOpen();
        } else {
          toast.error(signInResult.error);
        }
      } else {
        toast.success("Logged in");
        loginModal.onClose();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal, registerModal]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?
        <span
          onClick={onToggle}
          className="    text-white  cursor-pointer hover:underline  "
        >
          Create an account
        </span>
      </p>
    </div>
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
      {/* Add a "Forgot Password?" link/button here if needed */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel={isLoading ? "Signing in..." : "Sign in"}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignInModal;
